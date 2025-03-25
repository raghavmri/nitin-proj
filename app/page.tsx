"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Building2,
  UserPlus,
  Users,
  CheckCircle,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Wrapper from "@/components/Warp";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroImages = [
    "/doctor-consultation.jpg",
    "/medical-technology.jpg",
    "/hospital-corridor.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <div className="min-h-screen bg-gray-900 text-white relative overflow-x-hidden">
        {/* Hero Section with Sliding Background */}
        <div className="relative h-screen w-full overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="w-full h-full absolute inset-0 object-cover"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            </div>
          ))}

          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold mb-6 text-white animate-fadeIn">
                Medical Management System
              </h1>
              <p className="text-xl mb-8 text-gray-300 animate-fadeIn delay-300">
                Comprehensive healthcare management solution designed for modern
                medical practices
              </p>
              <div className="flex space-x-4 animate-fadeIn delay-500">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/20 transition-colors"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">
                Our Key Features
              </h2>
              <p className="text-gray-400 mt-4">
                Transforming healthcare management with cutting-edge technology
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: UserPlus,
                  title: "Patient Management",
                  description:
                    "Comprehensive patient record tracking and management",
                  color: "text-blue-400",
                },
                {
                  icon: HeartPulse,
                  title: "Medical Tracking",
                  description: "Advanced health monitoring and reporting",
                  color: "text-green-400",
                },
                {
                  icon: Building2,
                  title: "Practice Operations",
                  description:
                    "Streamline administrative and clinical workflows",
                  color: "text-purple-400",
                },
              ].map((feature) => (
                <Card
                  key={feature.title}
                  className="bg-gray-700 border-gray-600 group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-600 group-hover:bg-gray-500 transition-colors`}
                    >
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Integration Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Advanced Technology Integration
                </h2>
                <p className="text-gray-400 mb-6">
                  Our system leverages cutting-edge technology to provide
                  seamless healthcare management.
                </p>
                <ul className="space-y-4">
                  {[
                    "AI-powered diagnostic assistance",
                    "Real-time patient data synchronization",
                    "Secure cloud-based infrastructure",
                    "Intuitive user interface",
                  ].map((item) => (
                    <li key={item} className="flex items-center text-gray-300">
                      <CheckCircle className="mr-3 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/doctor-consultation.jpg"
                  alt="Technology in Healthcare"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-2xl transform transition-transform hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Transform Your Medical Practice Today
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Experience the future of healthcare management
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Schedule Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700 transition-colors"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Wrapper>
  );
}
