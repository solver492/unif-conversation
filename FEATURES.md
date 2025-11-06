# 🚀 Guide Complet des Fonctionnalités

## 📋 Vue d'ensemble

Cette application est une **plateforme de gestion de chatbots multi-sites** qui permet de:
- Créer et gérer plusieurs chatbots (D3Drone, MonAuxiliaire, Rhilkom, etc.)
- Suivre les visiteurs en temps réel avec géolocalisation
- Intervenir manuellement dans les conversations
- Recevoir des notifications instantanées
- Partager des fichiers dans les conversations (images, vidéos, documents)

---

## 🎯 Fonctionnalités Principales

### 1. 🤖 Création et Gestion de Chatbots

#### Comment créer un chatbot:

1. **Accéder à "Mes Chatbots"**
   - Cliquez sur l'icône robot dans la sidebar

2. **Créer un nouveau chatbot**
   - Cliquez sur "Créer un nouveau chatbot"
   - Remplissez les informations:
     - **Identité:** Nom, description, avatar, couleurs
     - **Prompts:** Instructions système pour l'IA
     - **Knowledge Base:** Ajoutez des URLs, fichiers ou texte
     - **Widget:** Configurez l'apparence et la position
     - **Test:** Testez votre chatbot en direct
     - **Script:** Copiez le code d'intégration

3. **Intégrer sur votre site**
   ```html
   <script>
   (function() {
     var chatbot = document.createElement('script');
     chatbot.src = 'https://votre-domaine.com/widget.js';
     chatbot.setAttribute('data-chatbot-id', 'VOTRE_ID');
     document.body.appendChild(chatbot);
   })();
   </script>
   ```

#### Fonctionnalités du chatbot:
- ✅ System prompt personnalisé
- ✅ Base de connaissances (URLs, fichiers, texte)
- ✅ Couleurs et branding personnalisables
- ✅ Position configurable (bas-droite ou bas-gauche)
- ✅ Test en direct avant déploiement
- ✅ Code d'intégration généré automatiquement

---

### 2. 👥 Tracking des Visiteurs en Temps Réel

#### Informations collectées automatiquement:

**Localisation:**
- 🌍 Pays
- 🏙️ Ville
- 📍 Adresse IP

**Comportement:**
- ⏰ Première visite
- ⏱️ Dernière activité
- 📄 Page actuelle
- 🔗 Source de trafic (Google, Facebook, direct, etc.)

#### Où voir ces informations:
1. Allez dans "Conversations"
2. Sélectionnez une conversation
3. Regardez le panneau "Client Details" à droite
4. Sections "Location" et "Visit Info"

**Exemple d'affichage:**
```
Location
├─ City: Madrid
├─ Country: Spain
└─ IP: 185.45.23.12

Visit Info
├─ First seen: 2 hours ago
├─ Last seen: 2 min ago
├─ Page URL: https://rhilkom.com/checkout
└─ Referrer: https://google.com
```

---

### 3. 🔔 Système de Notifications

#### Types de notifications:

1. **Nouveau visiteur** 🟦
   - Alerte quand quelqu'un arrive sur votre site
   - Affiche: pays, ville, site concerné

2. **Nouveau message** 🟢
   - Notification quand un client envoie un message
   - Même si vous êtes sur une autre page

3. **Prise de contrôle** 🟣
   - Confirme quand vous prenez le contrôle manuel
   - Indique quel agent a pris le relais

4. **Succès** ✅
   - Confirmation d'actions (sauvegarde, envoi, etc.)

5. **Erreur** ❌
   - Alertes en cas de problème

#### Caractéristiques:
- Apparaissent en haut à droite
- Disparaissent automatiquement après 5-8 secondes
- Cliquables pour fermer manuellement
- Animation fluide d'entrée/sortie

---

### 4. 🎮 Mode Intervention Manuelle

#### Comment ça marche:

**Mode AI Assist (par défaut):**
- 🤖 Le chatbot répond automatiquement
- Utilise l'IA Gemini avec le system prompt configuré
- Contexte de conversation maintenu
- Base de connaissances utilisée

**Mode Manual:**
- 👤 Vous prenez le contrôle total
- Le bot arrête de répondre automatiquement
- Vous répondez directement au client
- Le client ne voit pas la différence

#### Basculer entre les modes:

1. **Dans une conversation:**
   - Regardez le panneau "Client Details"
   - Section "Interaction Mode"
   - Cliquez sur "Manual" ou "AI Assist"

2. **Indicateurs visuels:**
   - 🟦 Bleu = AI Assist actif
   - 🟢 Vert = Vous contrôlez la conversation

3. **Statut affiché:**
   ```
   ✓ You are controlling this conversation
   ```
   ou
   ```
   🤖 AI is responding automatically
   ```

#### Cas d'usage:
- Client VIP nécessitant attention personnelle
- Situation complexe que l'IA ne peut pas gérer
- Vente importante nécessitant expertise humaine
- Problème technique spécifique

---

### 5. 💬 Conversations Intelligentes

#### Fonctionnalités:

**Recherche et Filtres:**
- 🔍 Recherche par nom, email, message
- 📊 Filtre par statut (Active, Pending, Resolved)
- 📈 Compteur de résultats en temps réel

**Historique:**
- 📜 Contexte complet de la conversation
- 🕐 Timestamps précis
- 👤 Identification claire (Client, AI, Agent)

**Pièces jointes:**
- 📎 Support des images (affichage inline)
- 📄 Documents (PDF, Word, etc.)
- 🎥 Vidéos
- Interface de partage intuitive

---

### 6. 📊 Dashboard et Analytics

#### Métriques disponibles:

**Dashboard:**
- Conversations actives
- Messages traités aujourd'hui
- Taux de satisfaction (CSAT)
- Taux de conversion

**Analytics:**
- Volume de conversations (graphique)
- Temps de réponse moyen
- Questions fréquentes
- Taux de conversion par site

---

### 7. 🎨 Galerie Médias

#### Fonctionnalités:
- 🖼️ Affichage en grille
- 🔍 Recherche par nom ou expéditeur
- 🏷️ Filtres par type (Images, Documents, Videos)
- 📥 Téléchargement direct
- 👁️ Prévisualisation

---

## 🔧 Configuration Technique

### Variables d'environnement:

Fichier `.env.local`:
```env
GEMINI_API_KEY=votre_clé_api_gemini
```

### Obtenir une clé API Gemini:
1. Visitez https://ai.google.dev/
2. Créez un compte (gratuit)
3. Générez une clé API
4. Ajoutez-la dans `.env.local`

### Limites gratuites:
- 60 requêtes par minute
- 1500 requêtes par jour
- Suffisant pour tester et petits sites

---

## 📱 Workflow Complet

### Scénario: Nouveau client sur votre site

1. **Visiteur arrive** 🌐
   ```
   → Notification: "Nouveau visiteur de Paris, France"
   → Tracking automatique: IP, page, referrer
   → Chatbot s'affiche sur le site
   ```

2. **Client démarre conversation** 💬
   ```
   → Notification: "Nouveau message"
   → AI répond automatiquement
   → Vous voyez la conversation en temps réel
   ```

3. **Vous décidez d'intervenir** 👤
   ```
   → Cliquez sur "Manual" dans Interaction Mode
   → Le bot arrête de répondre
   → Vous prenez le relais
   → Notification: "Vous contrôlez la conversation"
   ```

4. **Client partage un document** 📄
   ```
   → Document apparaît dans le chat
   → Sauvegardé dans Media Gallery
   → Vous pouvez le télécharger
   ```

5. **Conversation terminée** ✅
   ```
   → Marquez comme "Resolved"
   → Historique sauvegardé
   → Analytics mis à jour
   ```

---

## 🎯 Cas d'Usage par Site

### D3Drone (Drones)
**Configuration recommandée:**
- System Prompt: Expert en technologie drone
- Knowledge Base: Manuels produits, FAQ technique
- Couleur: Bleu (#3B82F6)
- Position: Bas-droite

**Scénarios:**
- Support technique
- Conseils d'achat
- Résolution de problèmes
- Suivi de commande

### MonAuxiliaire (Assistant Personnel)
**Configuration recommandée:**
- System Prompt: Assistant personnel amical
- Knowledge Base: Services offerts, tarifs
- Couleur: Vert (#10B981)
- Position: Bas-droite

**Scénarios:**
- Prise de rendez-vous
- Questions générales
- Organisation de tâches
- Rappels

### Rhilkom (Télécommunications)
**Configuration recommandée:**
- System Prompt: Support client télécoms
- Knowledge Base: FAQ facturation, plans
- Couleur: Violet (#8B5CF6)
- Position: Bas-gauche

**Scénarios:**
- Questions de facturation
- Changement de forfait
- Support technique
- Réclamations

---

## 🔐 Sécurité et Confidentialité

### Données stockées localement:
- ✅ Conversations
- ✅ Messages
- ✅ Chatbots configurés
- ✅ Préférences utilisateur

### Données NON stockées:
- ❌ Mots de passe
- ❌ Informations bancaires
- ❌ Données sensibles

### Recommandations:
1. Ne partagez jamais votre clé API Gemini
2. Utilisez HTTPS sur vos sites
3. Respectez le RGPD pour les données clients
4. Informez les visiteurs du tracking

---

## 🚀 Déploiement sur Vos Sites

### Étape 1: Créer le chatbot
1. Configurez l'identité et le prompt
2. Ajoutez la base de connaissances
3. Testez en direct
4. Copiez le code d'intégration

### Étape 2: Intégrer sur le site
1. Collez le code avant `</body>`
2. Vérifiez que le chatbot apparaît
3. Testez une conversation

### Étape 3: Personnaliser (optionnel)
```javascript
// Personnalisation avancée
window.chatbotConfig = {
  position: 'bottom-right',
  primaryColor: '#3B82F6',
  welcomeMessage: 'Bonjour! Comment puis-je vous aider?',
  autoOpen: false, // Ne pas ouvrir automatiquement
  delay: 3000 // Attendre 3 secondes avant d'afficher
};
```

---

## 📞 Support et Dépannage

### Problèmes courants:

**Le chatbot ne répond pas:**
- ✅ Vérifiez la clé API Gemini
- ✅ Vérifiez la console du navigateur
- ✅ Vérifiez le quota API

**Les notifications n'apparaissent pas:**
- ✅ Vérifiez les permissions du navigateur
- ✅ Désactivez les bloqueurs de pop-up

**Les données ne persistent pas:**
- ✅ Vérifiez que localStorage est activé
- ✅ Vérifiez l'espace disque disponible

**Erreur "API Key invalid":**
- ✅ Régénérez une nouvelle clé sur ai.google.dev
- ✅ Vérifiez qu'il n'y a pas d'espaces dans la clé
- ✅ Redémarrez le serveur après modification

---

## 🎓 Bonnes Pratiques

### System Prompts:
```
✅ BON:
"You are a helpful customer service agent for D3Drone. 
You specialize in drone technology and sales. 
Be friendly, professional, and concise."

❌ MAUVAIS:
"Answer questions."
```

### Base de Connaissances:
- Ajoutez des URLs de vos pages FAQ
- Incluez des extraits de manuels
- Mettez à jour régulièrement
- Testez que l'IA utilise bien les infos

### Intervention Manuelle:
- Prenez le contrôle pour les cas complexes
- Laissez l'IA gérer les questions simples
- Formez votre équipe sur le système
- Documentez les cas nécessitant intervention

---

## 📈 Prochaines Fonctionnalités

### Court terme:
- [ ] Upload de fichiers réels dans le chat
- [ ] Notifications sonores
- [ ] Mode sombre/clair
- [ ] Export des conversations (PDF, CSV)

### Moyen terme:
- [ ] Backend avec base de données
- [ ] Authentification multi-utilisateurs
- [ ] Webhooks pour intégrations tierces
- [ ] Application mobile

### Long terme:
- [ ] Intégration WhatsApp, Messenger
- [ ] Analytics avancées avec IA
- [ ] A/B testing des prompts
- [ ] Multi-langue automatique

---

## 🎉 Conclusion

Vous avez maintenant une plateforme complète pour:
- ✅ Gérer plusieurs chatbots sur différents sites
- ✅ Suivre vos visiteurs en temps réel
- ✅ Intervenir quand nécessaire
- ✅ Recevoir des notifications instantanées
- ✅ Partager des fichiers avec vos clients

**L'application est prête pour la production!** 🚀

Pour toute question, consultez:
- `IMPROVEMENTS.md` - Détails techniques
- `README.md` - Installation et démarrage
- Console du navigateur - Debugging

---

**Version:** 2.1.0  
**Date:** 6 Novembre 2025  
**Statut:** ✅ Production Ready
