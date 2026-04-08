'use client'

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, BookOpen, Share2 } from "lucide-react"
const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // évite le défilement
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
        document.execCommand('copy');
        alert('Lien copié !');
    } catch (err) {
        alert('Impossible de copier le lien. Veuillez le copier manuellement.');
    }
    document.body.removeChild(textarea);
};


export default function GuideSidebar({ guide, relatedGuides }: { guide: any; relatedGuides: any[] }) {
    return (
        <div className="space-y-6">
            {/* Carte de résumé */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">En bref</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {guide.duration && (
                        <div className="flex items-start">
                            <Calendar className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                            <div>
                                <p className="font-medium">Durée</p>
                                <p className="text-sm text-gray-600">{guide.duration}</p>
                            </div>
                        </div>
                    )}
                    {guide.category && (
                        <div className="flex items-start">
                            <MapPin className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                            <div>
                                <p className="font-medium">Type</p>
                                <p className="text-sm text-gray-600">
                                    {guide.category === "itineraire" ? "Itinéraire" :
                                        guide.category === "pratique" ? "Guide pratique" :
                                            guide.category === "culture" ? "Culture" : "Saison"
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Guides similaires */}
            {relatedGuides.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Guides similaires</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {relatedGuides.map((g) => (
                            <Link key={g.id} href={`/guides/${g.slug}`}>
                                <div className="flex items-start group cursor-pointer">
                                    <BookOpen className="h-4 w-4 mr-2 text-gray-400 group-hover:text-red-600 mt-1" />
                                    <div>
                                        <p className="text-sm font-medium group-hover:text-red-600">{g.title}</p>
                                        <p className="text-xs text-gray-500 line-clamp-1">{g.subtitle}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Action : imprimer / partager */}
            <Card>
                <CardContent className="p-4">
                    <Button
                        variant="outline"
                        className="w-full mb-2"
                        onClick={() => window.print()}
                    >
                        Imprimer ce guide
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            const url = window.location.href;
                            if (navigator.share) {
                                navigator.share({
                                    title: guide.title,
                                    text: guide.subtitle,
                                    url: url,
                                }).catch(() => copyToClipboard(url));
                            } else {
                                copyToClipboard(url);
                            }
                        }}
                    >
                        <Share2 className="h-4 w-4 mr-2" />
                        Partager
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}