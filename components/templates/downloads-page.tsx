import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Check, FileIcon, FileText, FileImage, ArrowRight } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

interface DownloadsPageProps {
  leadId: Id<"giveawayLeads">;
  templateSlug: string;
}

export default function DownloadsPage({ leadId, templateSlug }: DownloadsPageProps) {
  console.log("DownloadsPage rendered with leadId:", leadId, "templateSlug:", templateSlug);
  
  // First, get the lead by ID directly
  const lead = useQuery(api.templates.getLeadById, { id: leadId });
  console.log("Lead data retrieved:", lead);
  
  const templateFiles = useQuery(api.templates.getTemplateFilesBySlug, {
    slug: templateSlug,
  });
  console.log("Template files retrieved:", templateFiles);
  
  const markFileDownloaded = useMutation(api.templates.markFileDownloaded);
  
  // Calculate if all files have been downloaded
  const [allDownloaded, setAllDownloaded] = useState(false);
  
  useEffect(() => {
    if (lead && lead.filesDownloaded) {
      const allDone = lead.filesDownloaded.every((file: any) => file.isDownloaded);
      setAllDownloaded(allDone);
      console.log("All files downloaded status:", allDone);
    }
  }, [lead]);
  
  // Handle file download
  const handleDownload = async (fileId: string, fileUrl: string) => {
    console.log("Handling download for fileId:", fileId);
    // Open the file in a new tab
    window.open(fileUrl, "_blank");
    
    // Mark as downloaded in the database
    try {
      const result = await markFileDownloaded({
        leadId,
        fileId,
      });
      console.log("File marked as downloaded:", result);
    } catch (error) {
      console.error("Error marking file as downloaded:", error);
    }
  };
  
  // Get file icon based on type
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <FileImage className="h-8 w-8 text-blue-500" />;
    } else if (fileType.includes("pdf")) {
      return <FileText className="h-8 w-8 text-red-500" />;
    } else {
      return <FileIcon className="h-8 w-8 text-gray-500" />;
    }
  };
  
  // If we're still loading data or there's an error
  if (!lead || !templateFiles) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <p className="text-muted-foreground">Bezig met het laden van uw bestanden...</p>
      </div>
    );
  }
  
  // Additional check to ensure the lead has filesDownloaded property
  if (!lead.filesDownloaded || !Array.isArray(lead.filesDownloaded)) {
    console.error("Lead data is invalid - missing filesDownloaded array", lead);
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-red-500 text-xl">⚠️</div>
        <p className="text-muted-foreground">Er is een probleem opgetreden bij het laden van uw bestanden.</p>
        <Button onClick={() => window.location.reload()} variant="outline" size="sm">
          Probeer opnieuw
        </Button>
      </div>
    );
  }
  
  // Map template files to lead's download status
  const filesWithStatus = templateFiles.map(file => {
    const downloadStatus = lead.filesDownloaded.find((f: any) => f.fileId === file.fileId);
    return {
      ...file,
      isDownloaded: downloadStatus ? downloadStatus.isDownloaded : false,
    };
  });
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Uw downloads</h2>
        <p className="text-muted-foreground">
          Bedankt voor uw registratie! Hier kunt u alle bestanden downloaden.
        </p>
      </div>
      
      {filesWithStatus.length === 0 ? (
        <div className="text-center p-10 border rounded-lg">
          <FileIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Geen bestanden beschikbaar</h3>
          <p className="text-muted-foreground">
            Er zijn momenteel geen bestanden beschikbaar voor deze template.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filesWithStatus.map((file) => (
              <Card key={file.fileId} className={file.isDownloaded ? "border-green-200 bg-green-50" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      {getFileIcon(file.fileType)}
                      <CardTitle className="text-base font-medium">
                        {file.fileName}
                      </CardTitle>
                    </div>
                    {file.isDownloaded && (
                      <div className="rounded-full bg-green-100 p-1">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground py-2">
                  <p>
                    {file.isDownloaded 
                      ? "U heeft dit bestand gedownload." 
                      : "Klik op de download knop om dit bestand te downloaden."}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleDownload(file.fileId, file.fileUrl)}
                    variant={file.isDownloaded ? "outline" : "default"}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {file.isDownloaded ? "Opnieuw downloaden" : "Download"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {allDownloaded && filesWithStatus.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mt-8">
              <h3 className="text-xl font-semibold mb-2 text-green-800">
                Veel plezier met de template!
              </h3>
              <p className="text-green-700 mb-4">
                En voor vragen kun je ons altijd bereiken via LinkedIn.
              </p>
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://www.linkedin.com/company/keyholderagency" target="_blank" rel="noopener noreferrer">
                  Bezoek ons op LinkedIn
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
} 