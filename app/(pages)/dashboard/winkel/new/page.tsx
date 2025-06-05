"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { z } from "zod";
import { TEMPLATE_CATEGORIES, TEMPLATE_PLAN_TIERS } from "@/convex/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LoaderIcon, Save, TrashIcon, Upload, ImageIcon, X, CheckCircle, Upload as FileUploadIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Form schema
const templateSchema = z.object({
  name: z.string().min(3).max(80),
  slug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/),
  category: z.enum([
    TEMPLATE_CATEGORIES.EMAIL_MARKETING,
    TEMPLATE_CATEGORIES.LEAD_GENERATION,
    TEMPLATE_CATEGORIES.SOCIAL_MEDIA,
    TEMPLATE_CATEGORIES.DATA_AUTOMATION,
    TEMPLATE_CATEGORIES.CRM_INTEGRATION,
    TEMPLATE_CATEGORIES.CUSTOMER_SUPPORT,
    TEMPLATE_CATEGORIES.E_COMMERCE,
    TEMPLATE_CATEGORIES.PROJECT_MANAGEMENT,
    TEMPLATE_CATEGORIES.RECRUITMENT,
    TEMPLATE_CATEGORIES.ANALYTICS,
    TEMPLATE_CATEGORIES.CONTENT_MARKETING,
    TEMPLATE_CATEGORIES.FINANCE,
    TEMPLATE_CATEGORIES.SALES,
    TEMPLATE_CATEGORIES.OPERATIONS,
  ]),
  author: z.enum(["christian", "renier"]),
  heroUrl: z.string().min(1, "Hero image is required"),
  icons: z.array(z.string()).optional().default(["default-icon.svg"]),
  sticker: z.string().optional(),
  subtitle: z.string().optional(),
  descriptionBlocks: z.object({
    whoFor: z.string().min(10),
    problem: z.string().min(10),
    whatItDoes: z.string().min(10),
    setup: z.string().min(10),
    customise: z.string().min(10),
  }),
  pricing: z.array(
    z.object({
      tier: z.enum([
        TEMPLATE_PLAN_TIERS.DIY,
        TEMPLATE_PLAN_TIERS.INTEGRATION,
        TEMPLATE_PLAN_TIERS.CUSTOM,
        TEMPLATE_PLAN_TIERS.GIVEAWAY,
      ]),
      label: z.string().min(2),
      tagline: z.string().optional(),
      priceMode: z.enum(["fixed", "text"]),
      priceCents: z.number().optional(),
      priceText: z.string().optional(),
      ctaLabel: z.string().min(2),
      ctaType: z.enum(["stripe", "link"]),
      ctaValue: z.string(),
      bullets: z.array(z.string()),
      footer: z.string().optional(),
      highlight: z.boolean(),
    })
  ).min(1),
});

type TemplateFormValues = z.infer<typeof templateSchema>;

const defaultPricing = [
  {
    tier: TEMPLATE_PLAN_TIERS.DIY,
    label: "DIY",
    tagline: "For those who want to implement it themselves",
    priceMode: "fixed" as const,
    priceCents: 4900,
    ctaLabel: "Buy Now",
    ctaType: "stripe" as const,
    ctaValue: "price_123",
    bullets: [
      "Instant download",
      "Documentation included",
      "Self-implementation",
    ],
    highlight: false,
  },
  {
    tier: TEMPLATE_PLAN_TIERS.INTEGRATION,
    label: "Integration Package",
    tagline: "We set it up for you",
    priceMode: "fixed" as const,
    priceCents: 19900,
    ctaLabel: "Buy Integration",
    ctaType: "stripe" as const,
    ctaValue: "price_456",
    bullets: [
      "Setup by our experts",
      "Basic customization",
      "1 hour training session",
      "30 days support",
    ],
    highlight: true,
  },
  {
    tier: TEMPLATE_PLAN_TIERS.CUSTOM,
    label: "Custom Solution",
    tagline: "Tailored to your needs",
    priceMode: "text" as const,
    priceText: "Starting at €399",
    ctaLabel: "Contact Us",
    ctaType: "link" as const,
    ctaValue: "/contact",
    bullets: [
      "Fully customized implementation",
      "Integration with your systems",
      "Extended support",
      "Ongoing optimization",
    ],
    highlight: false,
  },
  {
    tier: TEMPLATE_PLAN_TIERS.GIVEAWAY,
    label: "Giveaway",
    tagline: "Get it for free by providing your info",
    priceMode: "text" as const,
    priceText: "Free",
    ctaLabel: "Download Now",
    ctaType: "link" as const,
    ctaValue: "#giveaway",
    bullets: [
      "Instant access",
      "Lead registration required",
      "Download resources after registration",
      "No payment needed"
    ],
    highlight: false,
  },
];

export default function NewTemplatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([
    TEMPLATE_PLAN_TIERS.DIY,
    TEMPLATE_PLAN_TIERS.INTEGRATION,
    TEMPLATE_PLAN_TIERS.CUSTOM,
    TEMPLATE_PLAN_TIERS.GIVEAWAY
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{id: string, name: string, url: string, type: string, size: number}>>([]);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  
  const createTemplate = useMutation(api.templates.create);
  const createTemplateFile = useMutation(api.templates.addTemplateFile);
  
  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: "",
      slug: "",
      category: TEMPLATE_CATEGORIES.EMAIL_MARKETING,
      author: "christian",
      heroUrl: "",
      sticker: "",
      subtitle: "",
      descriptionBlocks: {
        whoFor: "",
        problem: "",
        whatItDoes: "",
        setup: "",
        customise: "",
      },
      pricing: defaultPricing,
    },
  });
  
  const onSubmit = async (data: TemplateFormValues) => {
    console.log("onSubmit called with data:", data);
    setIsSubmitting(true);
    
    try {
      // Ensure icons array is properly set
      const submissionData = {
        ...data,
        icons: data.icons || ["default-icon.svg"]
      };
      
      console.log("Creating template with data:", submissionData);
      const result = await createTemplate(submissionData as any);
      console.log("Template created successfully:", result);
      
      // Add files for giveaway if applicable
      if (selectedTiers.includes(TEMPLATE_PLAN_TIERS.GIVEAWAY) && uploadedFiles.length > 0) {
        await addFilesToTemplate(result);
      }
      
      toast.success("Template created successfully");
      
      // Add slight delay before navigation to ensure toast is shown
      setTimeout(() => {
        router.push("/dashboard/winkel");
      }, 500);
    } catch (error) {
      console.error("Error creating template:", error);
      toast.error(`Failed to create template: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const generateSlug = () => {
    const name = form.getValues("name");
    if (!name) return;
    
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    
    form.setValue("slug", slug);
  };
  
  const handleImageUpload = async (file: File) => {
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }
    
    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      toast.error('Image size must be less than 2MB');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(10);
    
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('file', file);
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 15);
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 300);
      
      // Upload to server
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      setUploadProgress(100);
      
      // Set the image URL in the form
      form.setValue('heroUrl', data.url);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
  
  // Replace the hero URL input with this component
  const renderHeroImageUploader = () => {
    const imageUrl = form.watch('heroUrl');
    const dropzoneRef = useRef<HTMLDivElement>(null);
    
    // Handle drag events for the dropzone
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (dropzoneRef.current) {
        dropzoneRef.current.classList.add('border-primary');
        dropzoneRef.current.classList.add('bg-primary/5');
      }
    };
    
    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (dropzoneRef.current) {
        dropzoneRef.current.classList.remove('border-primary');
        dropzoneRef.current.classList.remove('bg-primary/5');
      }
    };
    
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (dropzoneRef.current) {
        dropzoneRef.current.classList.remove('border-primary');
        dropzoneRef.current.classList.remove('bg-primary/5');
      }
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageUpload(e.dataTransfer.files[0]);
      }
    };
    
    return (
      <FormField
        control={form.control}
        name="heroUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hero Image</FormLabel>
            <FormControl>
              <div className="space-y-4">
                {/* Image preview */}
                {imageUrl && (
                  <div className="relative border rounded-md overflow-hidden w-full aspect-video">
                    <img 
                      src={imageUrl} 
                      alt="Template preview" 
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => form.setValue('heroUrl', '')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {/* Upload controls */}
                {!imageUrl && (
                  <div
                    ref={dropzoneRef}
                    className="border-2 border-dashed rounded-md p-8 transition-all hover:bg-muted/50 hover:border-muted-foreground/50"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      {isUploading ? (
                        <>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-10 w-10 text-muted-foreground" />
                          <p className="text-sm font-medium">Drag & drop or click to upload</p>
                          <p className="text-xs text-muted-foreground">1120×630px recommended (Max 2MB)</p>
                          <p className="text-xs text-muted-foreground mt-1">Supported formats: JPEG, PNG, GIF, WebP</p>
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageUpload(e.target.files[0]);
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="mt-2"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Hidden input to store the URL */}
                <input
                  type="hidden"
                  {...field}
                />
              </div>
            </FormControl>
            <FormDescription>
              Hero image for your template (stored locally in public/shop/templates)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  
  // Save button click handler
  const handleSaveClick = () => {
    console.log("Save button clicked");
    console.log("Form values:", form.getValues());
    console.log("Form errors:", form.formState.errors);
    console.log("Hero URL:", form.getValues().heroUrl);
    
    if (Object.keys(form.formState.errors).length > 0) {
      // Show error toast if form has validation errors
      toast.error("Please fix form errors before saving");
      // Highlight fields with errors
      form.trigger();
    } else {
      // Submit the form if it's valid
      formRef.current?.requestSubmit();
    }
  };
  
  // Add pricing tier toggle handler
  const handleTierToggle = (tier: string) => {
    setSelectedTiers(prev => {
      // Update pricing plans in the form based on selected tiers
      const currentPricing = form.getValues("pricing");
      const tierExists = currentPricing.some(plan => plan.tier === tier);
      
      // Create new list of selected tiers
      const newSelectedTiers = prev.includes(tier) 
        ? prev.filter(t => t !== tier) 
        : [...prev, tier];
      
      if (!tierExists && !prev.includes(tier)) {
        // Add new pricing plan for this tier
        let newPlan;
        
        switch (tier) {
          case TEMPLATE_PLAN_TIERS.DIY:
            newPlan = {
              tier: TEMPLATE_PLAN_TIERS.DIY,
              label: "DIY",
              tagline: "For those who want to implement it themselves",
              priceMode: "fixed" as const,
              priceCents: 4900,
              ctaLabel: "Buy Now",
              ctaType: "stripe" as const,
              ctaValue: "price_123",
              bullets: [
                "Instant download",
                "Documentation included",
                "Self-implementation",
              ],
              highlight: false,
            };
            break;
          case TEMPLATE_PLAN_TIERS.INTEGRATION:
            newPlan = {
              tier: TEMPLATE_PLAN_TIERS.INTEGRATION,
              label: "Integration Package",
              tagline: "We set it up for you",
              priceMode: "fixed" as const,
              priceCents: 19900,
              ctaLabel: "Buy Integration",
              ctaType: "stripe" as const,
              ctaValue: "price_456",
              bullets: [
                "Setup by our experts",
                "Basic customization",
                "1 hour training session",
                "30 days support",
              ],
              highlight: true,
            };
            break;
          case TEMPLATE_PLAN_TIERS.CUSTOM:
            newPlan = {
              tier: TEMPLATE_PLAN_TIERS.CUSTOM,
              label: "Custom Solution",
              tagline: "Tailored to your needs",
              priceMode: "text" as const,
              priceText: "Starting at €399",
              ctaLabel: "Contact Us",
              ctaType: "link" as const,
              ctaValue: "/contact",
              bullets: [
                "Fully customized implementation",
                "Integration with your systems",
                "Extended support",
                "Ongoing optimization",
              ],
              highlight: false,
            };
            break;
          case TEMPLATE_PLAN_TIERS.GIVEAWAY:
            newPlan = {
              tier: TEMPLATE_PLAN_TIERS.GIVEAWAY,
              label: "Giveaway",
              tagline: "Get it for free by providing your info",
              priceMode: "text" as const,
              priceText: "Free",
              ctaLabel: "Download Now",
              ctaType: "link" as const,
              ctaValue: "#giveaway",
              bullets: [
                "Instant access",
                "Lead registration required",
                "Download resources after registration",
                "No payment needed",
              ],
              highlight: false,
            };
            break;
        }
        
        if (newPlan) {
          form.setValue("pricing", [...currentPricing, newPlan]);
        }
      } else if (tierExists && prev.includes(tier)) {
        // Remove pricing plan for this tier
        const updatedPricing = currentPricing.filter(plan => plan.tier !== tier);
        form.setValue("pricing", updatedPricing);
      }
      
      return newSelectedTiers;
    });
  };
  
  // Handle template file upload
  const handleTemplateFileUpload = async (file: File) => {
    if (!file) return;
    
    // Validate file
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return;
    }
    
    setIsFileUploading(true);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload file
      const response = await fetch('/api/upload-template-file', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      
      // Add to uploaded files list
      setUploadedFiles(prev => [
        ...prev, 
        {
          id: `file_${Date.now()}`,
          name: data.name,
          url: data.url,
          type: data.type,
          size: data.size,
        }
      ]);
      
      toast.success(`${data.name} uploaded successfully`);
    } catch (error) {
      console.error('File upload error:', error);
      toast.error('Failed to upload file');
    } finally {
      setIsFileUploading(false);
    }
  };
  
  // Remove uploaded file
  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  // Add files to template after saving
  const addFilesToTemplate = async (templateId: any) => {
    try {
      for (const file of uploadedFiles) {
        await createTemplateFile({
          templateId,
          fileName: file.name,
          fileUrl: file.url,
          fileType: file.type,
          fileSize: file.size,
        });
      }
    } catch (error) {
      console.error('Error adding files to template:', error);
      toast.error('Some files could not be added to the template');
    }
  };
  
  // Add this component to render pricing plan selection
  const renderPricingPlanSelection = () => {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Pricing Plans</CardTitle>
          <CardDescription>
            Choose which pricing options you want to offer for this template
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="font-medium leading-none">DIY</p>
                <p className="text-sm text-muted-foreground">
                  For self-implementation
                </p>
              </div>
              <Switch 
                checked={selectedTiers.includes(TEMPLATE_PLAN_TIERS.DIY)}
                onCheckedChange={() => handleTierToggle(TEMPLATE_PLAN_TIERS.DIY)}
              />
            </div>
            
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="font-medium leading-none">Integration Package</p>
                <p className="text-sm text-muted-foreground">
                  Setup by our experts
                </p>
              </div>
              <Switch 
                checked={selectedTiers.includes(TEMPLATE_PLAN_TIERS.INTEGRATION)}
                onCheckedChange={() => handleTierToggle(TEMPLATE_PLAN_TIERS.INTEGRATION)}
              />
            </div>
            
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="font-medium leading-none">Custom</p>
                <p className="text-sm text-muted-foreground">
                  Tailored solutions
                </p>
              </div>
              <Switch 
                checked={selectedTiers.includes(TEMPLATE_PLAN_TIERS.CUSTOM)}
                onCheckedChange={() => handleTierToggle(TEMPLATE_PLAN_TIERS.CUSTOM)}
              />
            </div>
            
            <div className="flex items-center space-x-4 rounded-md border p-4 bg-green-50/10">
              <div className="flex-1 space-y-1">
                <p className="font-medium leading-none">Giveaway</p>
                <p className="text-sm text-muted-foreground">
                  Free with lead capture
                </p>
              </div>
              <Switch 
                checked={selectedTiers.includes(TEMPLATE_PLAN_TIERS.GIVEAWAY)}
                onCheckedChange={() => handleTierToggle(TEMPLATE_PLAN_TIERS.GIVEAWAY)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // Add file upload component for giveaways
  const renderGiveawayFilesUploader = () => {
    if (!selectedTiers.includes(TEMPLATE_PLAN_TIERS.GIVEAWAY)) {
      return null;
    }
    
    return (
      <Card className="mb-6 border-green-200">
        <CardHeader className="bg-green-50/10">
          <CardTitle className="flex items-center">
            <span className="text-green-600 mr-2">●</span>
            Giveaway Files
          </CardTitle>
          <CardDescription>
            Upload files that visitors can download after registering their information
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Files counter */}
            {uploadedFiles.length > 0 && (
              <div className="text-sm mb-2 text-green-600 font-medium">
                {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} uploaded
              </div>
            )}
            
            {/* File list */}
            {uploadedFiles.length > 0 && (
              <ScrollArea className="h-[200px] rounded-md border">
                <div className="p-4 space-y-2">
                  {uploadedFiles.map(file => (
                    <div 
                      key={file.id} 
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-blue-100 p-2">
                          <FileUploadIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">{file.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{formatFileSize(file.size)}</span>
                            <span className="mx-2">•</span>
                            <Badge variant="outline" className="text-xs">
                              {file.type.split('/')[1].toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFile(file.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
            
            {/* Upload button */}
            <div className="flex justify-center">
              <input
                type="file"
                ref={fileUploadRef}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleTemplateFileUpload(e.target.files[0]);
                  }
                }}
              />
              <Button
                type="button"
                variant={uploadedFiles.length === 0 ? "default" : "outline"}
                className="w-full"
                onClick={() => fileUploadRef.current?.click()}
                disabled={isFileUploading}
              >
                {isFileUploading ? (
                  <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <FileUploadIcon className="h-4 w-4 mr-2" />
                )}
                {uploadedFiles.length === 0 ? "Upload Giveaway Files" : "Upload More Files"}
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Upload PDFs, images, or other files (max 10MB per file) that visitors will receive after registration
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">New Template</h1>
          <p className="text-muted-foreground">
            Create a new template for the marketplace
          </p>
        </div>
        
        <Button 
          type="button"
          onClick={handleSaveClick}
          disabled={isSubmitting}
          className="gap-2"
        >
          {isSubmitting && <LoaderIcon className="h-4 w-4 animate-spin" />}
          <Save className="h-4 w-4" />
          Save Template
        </Button>
      </div>
      
      <Form {...form}>
        <form 
          ref={formRef} 
          onSubmit={(e) => {
            console.log("Form submitted");
            // Prevent default to manually handle submission
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }} 
          className="space-y-8"
        >
          <Tabs defaultValue="basic">
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Enter the basic details of your template
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="LinkedIn Lead Generation Workflow" 
                              {...field} 
                              onChange={(e) => {
                                field.onChange(e);
                                if (form.getValues("slug") === "") {
                                  generateSlug();
                                }
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            The name of your template (max 80 chars)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template Slug</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input 
                                placeholder="linkedin-lead-generation" 
                                {...field} 
                              />
                            </FormControl>
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={generateSlug}
                            >
                              Generate
                            </Button>
                          </div>
                          <FormDescription>
                            URL-friendly name (lowercase, no spaces)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(TEMPLATE_CATEGORIES).map(([key, value]) => (
                                <SelectItem key={key} value={value}>
                                  {value
                                    .split("-")
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(" ")}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose the category your template belongs to
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an author" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="christian">Christian Bleeker</SelectItem>
                              <SelectItem value="renier">Renier Bleeker</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Who created this template
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {renderHeroImageUploader()}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="subtitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subtitle</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Automate your LinkedIn outreach process" 
                              {...field} 
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormDescription>
                            Short description (optional)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sticker"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sticker</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="New" 
                              {...field} 
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormDescription>
                            Optional badge/sticker (e.g., "New", "Popular")
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="description" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Description Blocks</CardTitle>
                  <CardDescription>
                    Describe the template in detail
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="descriptionBlocks.whoFor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Who this is for</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the target audience"
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="descriptionBlocks.problem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>The problem it solves</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the problem"
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="descriptionBlocks.whatItDoes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What it does</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the functionality"
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="descriptionBlocks.setup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Setup process</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the setup process"
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="descriptionBlocks.customise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How to customize</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe how to customize"
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pricing" className="space-y-6">
              {renderPricingPlanSelection()}
              
              {renderGiveawayFilesUploader()}
              
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Plans</CardTitle>
                  <CardDescription>
                    Configure pricing tiers for your template
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Accordion type="multiple" defaultValue={["0", "1", "2"]} className="space-y-4">
                    {form.watch("pricing").map((plan, index) => (
                      <AccordionItem key={index} value={index.toString()} className="border rounded-md">
                        <AccordionTrigger className="px-4">
                          <div className="flex justify-between w-full pr-4">
                            <span>{plan.label || `Plan ${index + 1}`}</span>
                            <span className="text-sm text-muted-foreground">
                              {plan.priceMode === "fixed" 
                                ? `€${((plan.priceCents || 0) / 100).toFixed(2)}`
                                : plan.priceText}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-2">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name={`pricing.${index}.tier`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Tier</FormLabel>
                                    <Select 
                                      onValueChange={(value) => {
                                        field.onChange(value);
                                        
                                        // If set to giveaway, auto-configure other fields
                                        if (value === TEMPLATE_PLAN_TIERS.GIVEAWAY) {
                                          form.setValue(`pricing.${index}.priceMode`, "text");
                                          form.setValue(`pricing.${index}.priceText`, "Free");
                                          form.setValue(`pricing.${index}.ctaType`, "link");
                                          form.setValue(`pricing.${index}.ctaValue`, "#giveaway");
                                          form.setValue(`pricing.${index}.ctaLabel`, "Download Now");
                                        }
                                      }}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select a tier" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value={TEMPLATE_PLAN_TIERS.DIY}>DIY</SelectItem>
                                        <SelectItem value={TEMPLATE_PLAN_TIERS.INTEGRATION}>Integration</SelectItem>
                                        <SelectItem value={TEMPLATE_PLAN_TIERS.CUSTOM}>Custom</SelectItem>
                                        <SelectItem value={TEMPLATE_PLAN_TIERS.GIVEAWAY}>Giveaway</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name={`pricing.${index}.label`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name={`pricing.${index}.tagline`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Tagline</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="For those who want to implement it themselves"
                                      {...field} 
                                      value={field.value || ""}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name={`pricing.${index}.priceMode`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Price Mode</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                    disabled={form.watch(`pricing.${index}.tier`) === TEMPLATE_PLAN_TIERS.GIVEAWAY}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select price mode" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="fixed">Fixed Price</SelectItem>
                                      <SelectItem value="text">Text Price</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            {form.watch(`pricing.${index}.priceMode`) === "fixed" ? (
                              <FormField
                                control={form.control}
                                name={`pricing.${index}.priceCents`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Price (in cents)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number"
                                        placeholder="4900 (for €49)"
                                        {...field} 
                                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                        value={field.value || ""}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Enter price in cents (e.g., 4900 for €49)
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ) : (
                              <FormField
                                control={form.control}
                                name={`pricing.${index}.priceText`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Price Text</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Starting at €399"
                                        {...field} 
                                        value={field.value || ""}
                                        disabled={form.watch(`pricing.${index}.tier`) === TEMPLATE_PLAN_TIERS.GIVEAWAY}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name={`pricing.${index}.ctaType`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>CTA Type</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                      disabled={form.watch(`pricing.${index}.tier`) === TEMPLATE_PLAN_TIERS.GIVEAWAY}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select CTA type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="stripe">Stripe Checkout</SelectItem>
                                        <SelectItem value="link">External Link</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name={`pricing.${index}.ctaLabel`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>CTA Label</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Buy Now"
                                        {...field} 
                                        disabled={form.watch(`pricing.${index}.tier`) === TEMPLATE_PLAN_TIERS.GIVEAWAY}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name={`pricing.${index}.ctaValue`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {form.watch(`pricing.${index}.ctaType`) === "stripe" ? "Stripe Price ID" : "Link URL"}
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder={form.watch(`pricing.${index}.ctaType`) === "stripe" ? "price_123" : "/contact"}
                                      {...field}
                                      disabled={form.watch(`pricing.${index}.tier`) === TEMPLATE_PLAN_TIERS.GIVEAWAY}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    {form.watch(`pricing.${index}.ctaType`) === "stripe" 
                                      ? "Enter the Stripe Price ID" 
                                      : form.watch(`pricing.${index}.tier`) === TEMPLATE_PLAN_TIERS.GIVEAWAY 
                                        ? "Always set to #giveaway for Giveaway plans" 
                                        : "Enter the URL to link to"}
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name={`pricing.${index}.bullets`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bullet Points</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="One feature per line"
                                      className="min-h-24"
                                      onChange={(e) => {
                                        const bullets = e.target.value
                                          .split("\n")
                                          .map(bullet => bullet.trim())
                                          .filter(Boolean);
                                        field.onChange(bullets);
                                      }}
                                      value={field.value?.join("\n") || ""}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Enter one feature per line
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name={`pricing.${index}.footer`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Footer Text</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Optional footer note"
                                      {...field} 
                                      value={field.value || ""}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name={`pricing.${index}.highlight`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <input
                                      type="checkbox"
                                      checked={field.value}
                                      onChange={field.onChange}
                                      className="h-4 w-4"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Highlight this plan</FormLabel>
                                    <FormDescription>
                                      This plan will be displayed prominently
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              )}
                            />
                            
                            {form.watch("pricing").length > 1 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  const currentPricing = form.getValues("pricing");
                                  form.setValue(
                                    "pricing", 
                                    currentPricing.filter((_, i) => i !== index)
                                  );
                                }}
                                className="w-full mt-2"
                              >
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Remove Plan
                              </Button>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentPricing = form.getValues("pricing");
                      form.setValue("pricing", [
                        ...currentPricing,
                        {
                          tier: TEMPLATE_PLAN_TIERS.DIY,
                          label: "New Plan",
                          priceMode: "fixed",
                          priceCents: 0,
                          ctaLabel: "Buy Now",
                          ctaType: "stripe",
                          ctaValue: "",
                          bullets: ["Feature 1", "Feature 2"],
                          highlight: false,
                        },
                      ]);
                    }}
                    className="w-full mt-4"
                  >
                    Add Pricing Plan
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
} 