# ⚡ Démarrage Rapide - 10 Minutes

## 🎯 Objectif

Déployer votre application chatbot sur Internet et l'intégrer sur vos sites web en 10 minutes.

---

## 📋 Étapes Rapides

### **1. Installer Vercel (1 minute)**

```bash
npm install -g vercel
```

### **2. Se Connecter (1 minute)**

```bash
vercel login
```
→ Suivez les instructions dans le navigateur

### **3. Déployer (3 minutes)**

```bash
cd c:\Users\d3drone\Downloads\unif-conversation-main\unif-conversation-main
vercel
```

**Répondez:**
- Set up and deploy? → **Y**
- Link to existing project? → **N**
- Project name? → **chatbot-admin**
- Directory? → **./** (Enter)
- Override settings? → **N**

**Copiez l'URL affichée!**

### **4. Configurer les Variables (2 minutes)**

**Allez sur:** https://vercel.com/dashboard

**Settings → Environment Variables**

**Ajoutez:**
1. `VITE_SUPABASE_URL` = `https://jxelniiffmaifwwoellj.supabase.co`
2. `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4ZWxuaWlmZm1haWZ3d29lbGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MTU2MTYsImV4cCI6MjA3Nzk5MTYxNn0.E7tT-405eUBeXlF4_TysZUMCs-8VEWQJWD8IpPGcuu0`
3. `GEMINI_API_KEY` = `AIzaSyDc1FJ9-tFrk8d9lHe9zMcifKE47xP5oG8`

### **5. Redéployer (1 minute)**

```bash
vercel --prod
```

### **6. Tester (1 minute)**

**Ouvrez votre URL Vercel dans le navigateur**

✅ L'application fonctionne!

### **7. Intégrer sur D3Drone (1 minute)**

**Dans le HTML de d3drone.com, avant `</body>`:**

```html
<script>
  (function() {
    var chatbot = document.createElement('script');
    chatbot.src = 'https://VOTRE-URL-VERCEL/widget.js';
    chatbot.setAttribute('data-chatbot-id', 'widget_d3drone');
    document.body.appendChild(chatbot);
  })();
</script>
```

**⚠️ Remplacez `VOTRE-URL-VERCEL` par votre vraie URL!**

---

## ✅ C'est Terminé!

**Visitez d3drone.com:**
- Widget visible en bas à droite
- Cliquez et testez

**Ouvrez votre admin:**
- La conversation apparaît
- Vous pouvez répondre!

---

## 📚 Pour Plus de Détails

- **Guide complet:** `DEPLOIEMENT_VERCEL.md`
- **Scripts d'intégration:** `SCRIPTS_INTEGRATION.md`
- **Configuration BD:** `CONFIGURATION_FINALE_BD.md`

---

## 🎊 Félicitations!

**Votre chatbot est maintenant en ligne et fonctionnel!** 🚀
