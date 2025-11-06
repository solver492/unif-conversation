# 🚀 Guide de Déploiement sur Vercel

## ✅ Fichiers Préparés

- ✅ `vercel.json` - Configuration Vercel
- ✅ `public/widget.js` - Widget JavaScript pour vos sites web
- ✅ Application prête à déployer

---

## 📋 ÉTAPE 1: Installer Vercel CLI (2 minutes)

### **Ouvrez votre terminal (PowerShell ou CMD) et exécutez:**

```bash
npm install -g vercel
```

**Attendez l'installation...**

```
✅ Vercel CLI installé!
```

---

## 📋 ÉTAPE 2: Se Connecter à Vercel (1 minute)

### **Dans le terminal:**

```bash
vercel login
```

**Cela va ouvrir votre navigateur. Choisissez une méthode:**

- GitHub (recommandé)
- GitLab
- Bitbucket
- Email

**Suivez les instructions dans le navigateur, puis revenez au terminal.**

```
✅ Connecté à Vercel!
```

---

## 📋 ÉTAPE 3: Déployer l'Application (3 minutes)

### **Dans le terminal, allez dans le dossier du projet:**

```bash
cd c:\Users\d3drone\Downloads\unif-conversation-main\unif-conversation-main
```

### **Lancez le déploiement:**

```bash
vercel
```

### **Répondez aux questions:**

```
? Set up and deploy "..."? 
→ Y (Yes)

? Which scope do you want to deploy to?
→ Sélectionnez votre compte (utilisez les flèches ↑↓ et Enter)

? Link to existing project?
→ N (No)

? What's your project's name?
→ chatbot-admin (ou le nom que vous voulez)

? In which directory is your code located?
→ ./ (appuyez juste sur Enter)

? Want to override the settings?
→ N (No)
```

**Vercel va maintenant:**
1. Uploader vos fichiers
2. Installer les dépendances
3. Builder l'application
4. Déployer

**Attendez... (1-2 minutes)**

```
✅ Deployed to production!
🔗 https://chatbot-admin-xxxxx.vercel.app
```

**COPIEZ CETTE URL!** C'est l'adresse de votre application!

---

## 📋 ÉTAPE 4: Configurer les Variables d'Environnement (2 minutes)

### **Méthode 1: Via le Dashboard (Recommandé)**

1. **Ouvrez:** https://vercel.com/dashboard

2. **Cliquez sur votre projet** (chatbot-admin)

3. **Allez dans:** Settings → Environment Variables

4. **Ajoutez ces 3 variables:**

   **Variable 1:**
   ```
   Name: VITE_SUPABASE_URL
   Value: https://jxelniiffmaifwwoellj.supabase.co
   Environment: Production, Preview, Development (cochez les 3)
   ```

   **Variable 2:**
   ```
   Name: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4ZWxuaWlmZm1haWZ3d29lbGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MTU2MTYsImV4cCI6MjA3Nzk5MTYxNn0.E7tT-405eUBeXlF4_TysZUMCs-8VEWQJWD8IpPGcuu0
   Environment: Production, Preview, Development (cochez les 3)
   ```

   **Variable 3:**
   ```
   Name: GEMINI_API_KEY
   Value: AIzaSyDc1FJ9-tFrk8d9lHe9zMcifKE47xP5oG8
   Environment: Production, Preview, Development (cochez les 3)
   ```

5. **Cliquez "Save" pour chaque variable**

### **Méthode 2: Via le Terminal**

```bash
# Dans le dossier du projet
vercel env add VITE_SUPABASE_URL
# Collez: https://jxelniiffmaifwwoellj.supabase.co
# Sélectionnez: Production, Preview, Development

vercel env add VITE_SUPABASE_ANON_KEY
# Collez la clé anon
# Sélectionnez: Production, Preview, Development

vercel env add GEMINI_API_KEY
# Collez la clé Gemini
# Sélectionnez: Production, Preview, Development
```

---

## 📋 ÉTAPE 5: Redéployer avec les Variables (1 minute)

### **Dans le terminal:**

```bash
vercel --prod
```

**Attendez le redéploiement...**

```
✅ Deployed to production!
🔗 https://chatbot-admin-xxxxx.vercel.app
```

---

## 📋 ÉTAPE 6: Tester l'Application (1 minute)

### **Ouvrez l'URL dans votre navigateur:**

```
https://chatbot-admin-xxxxx.vercel.app
```

**Vous devriez voir:**
- ✅ Votre application de gestion de chatbot
- ✅ La vue Conversations
- ✅ Tout fonctionne!

**Testez:**
1. Allez dans "Mes Chatbots"
2. Créez un nouveau chatbot
3. Vérifiez qu'il est sauvegardé dans Supabase

---

## 📋 ÉTAPE 7: Intégrer sur vos Sites Web (1 minute par site)

### **Le widget est maintenant disponible à:**

```
https://chatbot-admin-xxxxx.vercel.app/widget.js
```

### **Pour D3Drone (d3drone.com):**

**Ajoutez ce code avant la balise `</body>`:**

```html
<script>
  (function() {
    var chatbot = document.createElement('script');
    chatbot.src = 'https://chatbot-admin-xxxxx.vercel.app/widget.js';
    chatbot.setAttribute('data-chatbot-id', 'widget_d3drone');
    document.body.appendChild(chatbot);
  })();
</script>
```

**⚠️ IMPORTANT: Remplacez `xxxxx` par votre vrai URL Vercel!**

### **Pour MonAuxiliaire (monauxiliaire.com):**

```html
<script>
  (function() {
    var chatbot = document.createElement('script');
    chatbot.src = 'https://chatbot-admin-xxxxx.vercel.app/widget.js';
    chatbot.setAttribute('data-chatbot-id', 'widget_monauxiliaire');
    document.body.appendChild(chatbot);
  })();
</script>
```

### **Pour Rhilkom (rhilkom.com):**

```html
<script>
  (function() {
    var chatbot = document.createElement('script');
    chatbot.src = 'https://chatbot-admin-xxxxx.vercel.app/widget.js';
    chatbot.setAttribute('data-chatbot-id', 'widget_rhilkom');
    document.body.appendChild(chatbot);
  })();
</script>
```

---

## 📋 ÉTAPE 8: Créer les Chatbots Correspondants (2 minutes)

### **Dans votre application déployée:**

1. **Allez dans "Mes Chatbots"**

2. **Créez 3 chatbots avec ces `script_id`:**

   **Chatbot 1:**
   ```
   Nom: D3Drone Support
   Script ID: widget_d3drone
   Description: Assistant pour les produits D3Drone
   ```

   **Chatbot 2:**
   ```
   Nom: MonAuxiliaire Assistant
   Script ID: widget_monauxiliaire
   Description: Assistant pour MonAuxiliaire
   ```

   **Chatbot 3:**
   ```
   Nom: Rhilkom Support
   Script ID: widget_rhilkom
   Description: Assistant pour Rhilkom
   ```

3. **Sauvegardez chaque chatbot**

---

## 🎊 C'EST TERMINÉ!

### **Maintenant:**

1. **Visitez d3drone.com** (avec le script intégré)
   - Le widget apparaît en bas à droite
   - Cliquez dessus
   - Envoyez un message

2. **Ouvrez votre application admin:**
   ```
   https://chatbot-admin-xxxxx.vercel.app
   ```
   - Allez dans "Conversations"
   - Vous voyez la nouvelle conversation!
   - Vous pouvez répondre!

3. **Le client sur d3drone.com:**
   - Reçoit votre réponse (après 3-5 secondes de polling)

---

## 🔄 Flux Complet

```
Client sur d3drone.com
    ↓
Clique sur le widget
    ↓
Envoie un message
    ↓
Sauvegardé dans Supabase
    ↓ (3-5 secondes)
Vous recevez notification dans l'app admin
    ↓
Vous répondez
    ↓
Sauvegardé dans Supabase
    ↓ (3-5 secondes)
Client reçoit la réponse
```

---

## 📊 Vérifications

### **✅ Checklist:**

- [ ] Vercel CLI installé
- [ ] Connecté à Vercel
- [ ] Application déployée
- [ ] Variables d'environnement configurées
- [ ] Application redéployée
- [ ] Application testée (fonctionne)
- [ ] Widget intégré sur d3drone.com
- [ ] Widget intégré sur monauxiliaire.com
- [ ] Widget intégré sur rhilkom.com
- [ ] Chatbots créés avec bons script_id
- [ ] Test complet effectué

---

## 🆘 Dépannage

### **Problème: "Command not found: vercel"**

**Solution:**
```bash
npm install -g vercel
# Puis fermez et rouvrez le terminal
```

### **Problème: "Failed to build"**

**Solution:**
```bash
# Vérifiez que package.json a le script build
npm run build
# Si ça fonctionne localement, ça fonctionnera sur Vercel
```

### **Problème: "Widget ne s'affiche pas"**

**Solution:**
1. Vérifiez que le script est bien dans `<body>`
2. Vérifiez l'URL du widget (doit être votre URL Vercel)
3. Ouvrez la console du navigateur (F12) pour voir les erreurs

### **Problème: "Conversation ne s'affiche pas dans l'admin"**

**Solution:**
1. Vérifiez que le `script_id` du chatbot correspond
2. Attendez 5 secondes (polling)
3. Rafraîchissez la page

---

## 🎯 Commandes Utiles

### **Redéployer après modifications:**
```bash
vercel --prod
```

### **Voir les logs:**
```bash
vercel logs
```

### **Voir les déploiements:**
```bash
vercel ls
```

### **Supprimer un déploiement:**
```bash
vercel rm [deployment-url]
```

---

## 💰 Coûts

### **Vercel (Plan Gratuit):**
- ✅ 100 GB bande passante/mois
- ✅ Déploiements illimités
- ✅ HTTPS automatique
- ✅ Domaine personnalisé
- ✅ Suffisant pour des milliers de visiteurs

### **Si vous dépassez:**
- Vercel vous préviendra
- Vous pouvez upgrader au plan Pro (20$/mois)
- Mais le plan gratuit est largement suffisant au début

---

## 🎊 Félicitations!

**Votre application est maintenant:**
- ✅ Déployée sur Internet
- ✅ Accessible 24/7
- ✅ Avec HTTPS sécurisé
- ✅ Intégrée sur vos sites web
- ✅ Connectée à Supabase
- ✅ Prête pour vos clients!

**Vous pouvez maintenant:**
- Gérer vos chatbots depuis n'importe où
- Recevoir des conversations de vos sites web
- Répondre à vos clients en temps quasi-réel
- Tout cela gratuitement!

---

**Besoin d'aide? Consultez:**
- Documentation Vercel: https://vercel.com/docs
- Support Vercel: https://vercel.com/support
