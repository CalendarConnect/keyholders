"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Download, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id") || null;
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [orderDetails, setOrderDetails] = useState<{
    templateName?: string;
    downloadUrl?: string;
    expiryTime?: string;
  }>({});
  
  useEffect(() => {
    const getOrderDetails = async () => {
      if (!sessionId) {
        setStatus("error");
        return;
      }
      
      try {
        // In real implementation, fetch order details from API
        // For demo purposes, we'll simulate a successful response
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setOrderDetails({
          templateName: "Your Template",
          downloadUrl: "#", // Would be a real download URL
          expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString(),
        });
        setStatus("success");
      } catch (error) {
        console.error("Error fetching order details:", error);
        setStatus("error");
      }
    };
    
    getOrderDetails();
  }, [sessionId]);
  
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl">
      <div className="text-center">
        {status === "loading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <Loader2 className="h-16 w-16 text-indigo-500 animate-spin mb-6" />
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Processing Your Order
            </h1>
            <p className="text-white/60 max-w-md mx-auto mb-8">
              Please wait while we process your payment and prepare your download...
            </p>
          </motion.div>
        )}
        
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-6" />
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Thank You For Your Purchase!
            </h1>
            <p className="text-white/60 max-w-md mx-auto mb-8">
              Your order has been successfully processed. Your download is now ready.
            </p>
            
            <div className="w-full max-w-md bg-white/5 rounded-2xl p-6 mb-8 text-left border border-white/10">
              <h2 className="font-semibold text-white mb-4">Order Details</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-white/60">Template:</span>
                  <span className="font-medium text-white">{orderDetails.templateName}</span>
                </div>
                
                <div className="flex items-center gap-2 text-white">
                  <Clock className="h-4 w-4 text-white/60" />
                  <span className="text-white/60">Download expires:</span>
                  <span>{orderDetails.expiryTime}</span>
                </div>
                
                <div className="pt-4">
                  <Button asChild className="w-full flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
                    <a href={orderDetails.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      Download Now
                    </a>
                  </Button>
                  <p className="text-xs text-white/60 text-center mt-2">
                    A copy of this link has also been sent to your email.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-x-4">
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                <Link href="/winkel">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Templates
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
        
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="text-red-500 text-6xl mb-6">❗</div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Something Went Wrong
            </h1>
            <p className="text-white/60 max-w-md mx-auto mb-8">
              We were unable to process your order or retrieve your download link. Please contact our support team for assistance.
            </p>
            
            <div className="space-x-4">
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                <Link href="/winkel">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Templates
                </Link>
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 