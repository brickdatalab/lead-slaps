import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight, EnvelopeSimple, DownloadSimple, Clock } from "@phosphor-icons/react";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading state for better UX
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Order Confirmed - Lead Slaps</title>
        <meta name="description" content="Your MCA lead order has been confirmed. Thank you for your purchase!" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navigation />

      <main className="min-h-[calc(100vh-200px)] bg-gradient-to-b from-slate-50 to-white">
        <div className="container-padding py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            {isLoading ? (
              <Card className="text-center p-12">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4" />
                  <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
                </div>
              </Card>
            ) : (
              <Card className="shadow-xl border-0 overflow-hidden">
                {/* Success Header */}
                <div className="bg-gradient-to-r from-green-500 to-accent p-8 text-white text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                  <p className="text-white/90">Thank you for your purchase</p>
                </div>

                <CardContent className="p-8">
                  {/* Order Details */}
                  <div className="space-y-6">
                    {sessionId && (
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">Order Reference</p>
                        <p className="font-mono text-sm break-all">{sessionId}</p>
                      </div>
                    )}

                    {/* What's Next Section */}
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 mb-4">What happens next?</h2>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <EnvelopeSimple className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900">Confirmation Email</h3>
                            <p className="text-sm text-muted-foreground">
                              You'll receive an order confirmation email with your receipt and order details shortly.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                            <Clock className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900">Order Processing</h3>
                            <p className="text-sm text-muted-foreground">
                              Our team will begin preparing your data package. Most orders are processed within 1-2 business hours.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                            <DownloadSimple className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900">Delivery</h3>
                            <p className="text-sm text-muted-foreground">
                              Once ready, you'll receive a secure download link via email. Standard delivery is same-day for most orders.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add-ons Info */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <h3 className="font-medium text-blue-900 mb-1">Selected Add-Ons</h3>
                      <p className="text-sm text-blue-700">
                        If you selected FundSense, TrustDial, or StatementSnap, those enhancements will be applied to your data before delivery.
                      </p>
                    </div>

                    {/* Support Contact */}
                    <div className="border-t pt-6">
                      <p className="text-sm text-muted-foreground mb-4">
                        Have questions about your order? Our team is here to help.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button asChild className="flex-1">
                          <Link to="/contact">
                            Contact Support
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1">
                          <Link to="/products">
                            Browse More Products
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Return Home Link */}
            <div className="text-center mt-8">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Return to homepage
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default OrderSuccess;
