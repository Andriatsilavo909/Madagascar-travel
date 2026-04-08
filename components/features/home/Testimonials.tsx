"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Marie Dubois",
    avatar: "👩",
    location: "Paris, France",
    comment: "Un site magnifique qui m'a permis de préparer mon voyage à Madagascar. Les informations sont précises et les photos sont superbes !",
    rating: 5
  },
  {
    name: "Jean Rakoto",
    avatar: "👨",
    location: "Antananarivo, Madagascar",
    comment: "En tant que guide local, je recommande ce site à tous mes clients. Les lieux sont bien présentés et les descriptions sont exactes.",
    rating: 5
  },
  {
    name: "Sophie Martin",
    avatar: "👩",
    location: "Lyon, France",
    comment: "Grâce à ce site, j'ai découvert des endroits incroyables que je n'aurais pas trouvés ailleurs. Merci !",
    rating: 4
  }
]

export function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ce que disent nos visiteurs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des voyageurs du monde entier partagent leur expérience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}