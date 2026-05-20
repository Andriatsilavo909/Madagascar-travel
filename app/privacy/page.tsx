export default function PrivacyPage() {
    return (
      <div className="container py-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Politique de confidentialité</h1>
        <p className="text-gray-500 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
  
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Collecte des informations</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Nous collectons les informations suivantes lorsque vous utilisez notre site :
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Informations de profil (si vous êtes guide)</li>
              <li>Données de connexion (adresse IP, type de navigateur)</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Utilisation des informations</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Vos informations sont utilisées pour :
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Créer et gérer votre compte</li>
              <li>Faciliter les mises en relation avec les guides</li>
              <li>Vous envoyer des confirmations de réservation</li>
              <li>Améliorer nos services</li>
              <li>Vous informer des actualités et offres (avec votre consentement)</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Partage des informations</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous ne vendons ni ne louons vos informations personnelles à des tiers. Vos informations peuvent être 
              partagées uniquement avec :
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Les guides que vous contactez (nom, email, téléphone)</li>
              <li>Les autorités légales si requis par la loi</li>
              <li>Nos prestataires techniques (hébergement, analyse)</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous utilisons des cookies pour améliorer votre expérience de navigation. Les cookies nous aident à :
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Mémoriser vos préférences</li>
              <li>Analyser le trafic du site</li>
              <li>Vous maintenir connecté</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Sécurité des données</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité pour protéger vos informations contre tout accès non autorisé. 
              Cependant, aucune méthode de transmission sur Internet n'est totalement sécurisée.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Vos droits</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Conformément à la législation, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement ("droit à l'oubli")</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Pour exercer ces droits, contactez-nous à : <strong>contact@madagascar-travel.com</strong>
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Conservation des données</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous conservons vos données aussi longtemps que votre compte est actif. Après suppression de votre compte, 
              vos données sont anonymisées ou supprimées dans un délai de 30 jours.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Modifications de la politique</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous pouvons modifier cette politique de confidentialité. Les modifications seront publiées sur cette page 
              avec une nouvelle date de mise à jour.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pour toute question concernant cette politique, contactez-nous à : <strong>contact@madagascar-travel.com</strong>
            </p>
          </section>
        </div>
      </div>
    );
  }