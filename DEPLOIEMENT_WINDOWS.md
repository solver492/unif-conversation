# 🪟 Guide de Déploiement sur Vercel - Windows

## ⚠️ IMPORTANT pour Windows

Sur Windows, utilisez **`npx vercel`** au lieu de **`vercel`**

---

## 📋 ÉTAPES COMPLÈTES

### **1. Installer Vercel CLI** ✅ (Déjà fait)

```powershell
npm install -g vercel
```

### **2. Se Connecter à Vercel** (EN COURS)

```powershell
npx vercel login
```

**Actions:**
1. Un lien s'affiche dans le terminal
2. Cliquez dessus (ou copiez-le dans le navigateur)
3. Connectez-vous avec GitHub/GitLab/Email
4. Autorisez Vercel CLI
5. Retournez au terminal
6. Appuyez sur ENTER

```
✅ Authenticated
```

### **3. Aller dans le Dossier du Projet** ✅ (Déjà fait)

```powershell
cd c:\Users\d3drone\Downloads\unif-conversation-main\unif-conversation-main
```

### **4. Déployer l'Application**

```powershell
npx vercel
```

**Questions et Réponses:**

```
? Set up and deploy "c:\Users\d3drone\Downloads\unif-conversation-main\unif-conversation-main"?
→ Y (tapez Y puis Enter)

? Which scope do you want to deploy to?
→ Utilisez les flèches ↑↓ pour sélectionner votre compte
→ Appuyez sur Enter

? Link to existing project?
→ N (tapez N puis Enter)

? What's your project's name?
→ chatbot-admin (tapez puis Enter)

? In which directory is your code located?
→ ./ (appuyez juste sur Enter)

? Want to override the settings? [y/N]
→ N (appuyez juste sur Enter)
```

**Vercel va maintenant:**
```
📦 Uploading files...
📦 Installing dependencies...
🔨 Building...
🚀 Deploying...
```

**Résultat (après 2-3 minutes):**
```
✅ Production: https://chatbot-admin-xxxxx.vercel.app [copied to clipboard]
📝 Deployed to production. Run `npx vercel --prod` to overwrite later.
```

**🎉 COPIEZ CETTE URL!** C'est l'adresse de votre application!

---

### **5. Configurer les Variables d'Environnement**

**Option A: Via le Dashboard (Recommandé)**

1. Ouvrez: https://vercel.com/dashboard
2. Cliquez sur votre projet "chatbot-admin"
3. Allez dans: **Settings** → **Environment Variables**
4. Ajoutez ces 3 variables:

**Variable 1:**
```
Name: VITE_SUPABASE_URL
Value: https://jxelniiffmaifwwoellj.supabase.co
Environments: ✅ Production ✅ Preview ✅ Development
```

**Variable 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4ZWxuaWlmZm1haWZ3d29lbGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MTU2MTYsImV4cCI6MjA3Nzk5MTYxNn0.E7tT-405eUBeXlF4_TysZUMCs-8VEWQJWD8IpPGcuu0
Environments: ✅ Production ✅ Preview ✅ Development
```

**Variable 3:**
```
Name: GEMINI_API_KEY
Value: AIzaSyDc1FJ9-tFrk8d9lHe9zMcifKE47xP5oG8
Environments: ✅ Production ✅ Preview ✅ Development
```

5. Cliquez **Save** pour chaque variable

**Option B: Via le Terminal**

```powershell
npx vercel env add VITE_SUPABASE_URL
# Collez: https://jxelniiffmaifwwoellj.supabase.co
# Sélectionnez: Production, Preview, Development (Espace pour cocher, Enter pour valider)

npx vercel env add VITE_SUPABASE_ANON_KEY
# Collez la clé anon
# Sélectionnez: Production, Preview, Development

npx vercel env add GEMINI_API_KEY
# Collez la clé Gemini
# Sélectionnez: Production, Preview, Development
```

---

### **6. Redéployer avec les Variables**

```powershell
npx vercel --prod
```

**Attendez...**

```
✅ Production: https://chatbot-admin-xxxxx.vercel.app
```

---

### **7. Tester l'Application**

**Ouvrez l'URL dans votre navigateur:**
```
https://chatbot-admin-xxxxx.vercel.app
```

**Vous devriez voir:**
- ✅ Votre application de gestion
- ✅ Vue "Conversations"
- ✅ Tout fonctionne!

---

## 🌐 Intégrer sur vos Sites Web

### **URL du Widget:**
```
https://chatbot-admin-xxxxx.vercel.app/widget.js
```

### **Script pour D3Drone.com:**

```html
<!-- Avant </body> -->
<script>
  (function() {
    var chatbot = document.createElement('script');
    chatbot.src = 'https://chatbot-admin-xxxxx.vercel.app/widget.js';
    chatbot.setAttribute('data-chatbot-id', 'widget_d3drone');
    document.body.appendChild(chatbot);
  })();
</script>
```

**⚠️ Remplacez `xxxxx` par votre vraie URL Vercel!**

### **Script pour MonAuxiliaire.com:**

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

### **Script pour Rhilkom.com:**

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

## 🎯 Commandes Utiles (Windows)

### **Redéployer après modifications:**
```powershell
npx vercel --prod
```

### **Voir les logs:**
```powershell
npx vercel logs
```

### **Voir les déploiements:**
```powershell
npx vercel ls
```

### **Ouvrir le dashboard:**
```powershell
npx vercel dashboard
```

---

## ✅ Checklist Complète

- [x] Vercel CLI installé
- [ ] **Connecté à Vercel** ← FAITES CECI MAINTENANT
- [ ] Application déployée
- [ ] URL Vercel copiée
- [ ] Variables d'environnement ajoutées
- [ ] Application redéployée
- [ ] Application testée
- [ ] Widget intégré sur d3drone.com
- [ ] Widget intégré sur monauxiliaire.com
- [ ] Widget intégré sur rhilkom.com
- [ ] Chatbots créés dans l'admin
- [ ] Test complet effectué

---

## 🆘 Problèmes Courants

### **"vercel: command not found"**
**Solution:** Utilisez `npx vercel` au lieu de `vercel`

### **"Failed to authenticate"**
**Solution:** 
```powershell
npx vercel logout
npx vercel login
```

### **"Build failed"**
**Solution:** Testez le build localement:
```powershell
npm run build
```

### **PowerShell bloque l'exécution**
**Solution:**
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## 🎊 Félicitations!

**Une fois terminé, vous aurez:**
- ✅ Application déployée sur Internet
- ✅ Accessible 24/7
- ✅ HTTPS sécurisé
- ✅ Widget sur vos sites web
- ✅ Tout gratuit!

---

## 📚 Documentation

- **Vercel Docs:** https://vercel.com/docs
- **Vercel CLI:** https://vercel.com/docs/cli
- **Support:** https://vercel.com/support

---

## 🚀 PROCHAINE ACTION

**Terminez la connexion à Vercel:**

1. Cliquez sur le lien dans votre terminal
2. Connectez-vous
3. Appuyez sur ENTER dans le terminal
4. Puis lancez: `npx vercel`

**C'est parti!** 🎯
