export default function TermsPage() {
    return (
      <div className="container py-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Conditions d'utilisation</h1>
        <p className="text-gray-500 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
  
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptation des conditions</h2>
            <p className="text-gray-700 leading-relaxed">
              En accédant et en utilisant le site Madagascar Travel, vous acceptez d'être lié par ces conditions d'utilisation. 
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Description du service</h2>
            <p className="text-gray-700 leading-relaxed">
              Madagascar Travel est une plateforme de mise en relation entre voyageurs et guides locaux à Madagascar. 
              Nous fournissons des informations sur les lieux touristiques, les circuits et les services des guides.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Compte utilisateur</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Pour utiliser certaines fonctionnalités de notre site, vous devez créer un compte. Vous êtes responsable de :
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>La confidentialité de votre mot de passe</li>
              <li>Toutes les activités effectuées sous votre compte</li>
              <li>Nous informer immédiatement de toute utilisation non autorisée</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Rôle des guides</h2>
            <p className="text-gray-700 leading-relaxed">
              Les guides inscrits sur notre plateforme sont des professionnels indépendants. Madagascar Travel n'est pas 
              responsable de la qualité des services fournis par les guides. Nous vous encourageons à vérifier les 
              qualifications et avis avant de faire une réservation.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Réservations et paiements</h2>
            <p className="text-gray-700 leading-relaxed">
              Les réservations effectuées via notre plateforme sont engageantes. Les modalités de paiement sont convenues 
              directement entre le client et le guide. Madagascar Travel n'effectue pas de transactions financières.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Annulation et remboursement</h2>
            <p className="text-gray-700 leading-relaxed">
              Les conditions d'annulation sont définies par chaque guide. En cas d'annulation de votre part, veuillez 
              contacter directement le guide. Madagascar Travel ne peut être tenu responsable des frais d'annulation.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Propriété intellectuelle</h2>
            <p className="text-gray-700 leading-relaxed">
              Tout le contenu du site (textes, images, logos) est la propriété de Madagascar Travel ou de ses partenaires. 
              Toute reproduction est interdite sans autorisation préalable.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Limitation de responsabilité</h2>
            <p className="text-gray-700 leading-relaxed">
              Madagascar Travel ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation 
              de notre site ou des services des guides.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Modifications des conditions</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur 
              dès leur publication sur le site.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pour toute question concernant ces conditions, contactez-nous à : <strong>contact@madagascar-travel.com</strong>
            </p>
          </section>
        </div>
      </div>
    );
  }