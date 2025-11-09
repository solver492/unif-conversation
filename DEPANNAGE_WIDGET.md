# 🔧 Dépannage Widget - Erreur "Cannot read properties of undefined"

## ❌ Erreur Actuelle

```
Erreur initialisation conversation: TypeError: Cannot read properties of undefined (reading 'hostname')
at initializeConversation (widget.js:270:41)
```

## 🔍 Cause du Problème

Le widget déployé sur Vercel utilise encore l'ancienne version avec l'erreur. Vercel a mis en cache l'ancien fichier.

---

## ✅ SOLUTION: Redéploiement Forcé

### **Étape 1: Redéployer avec --force**

**Dans PowerShell:**

```powershell
cd c:\Users\d3drone\Downloads\unif-conversation-main\unif-conversation-main

npx vercel --prod --force
```

**Répondez:**
```
? Set up and deploy? → Y
```

**Le flag `--force` force Vercel à:**
- ✅ Ignorer le cache
- ✅ Rebuilder complètement
- ✅ Redéployer tous les fichiers

**Attendez 2-3 minutes...**

---

### **Étape 2: Vérifier le Déploiement**

**Après le déploiement, ouvrez directement le widget dans votre navigateur:**

```
https://unif-conversation.vercel.app/widget.js
```

**Cherchez la ligne 270:**
```javascript
// Devrait être:
origin: (typeof window !== 'undefined' && window.location) ? window.location.hostname : 'unknown',

// PAS:
origin: window.location.hostname,
```

**Si vous voyez encore l'ancienne version:**
- Appuyez sur `Ctrl + F5` pour forcer le rechargement
- Ou videz le cache du navigateur

---

### **Étape 3: Vider TOUS les Caches**

#### **A. Cache du Navigateur (sur d3drone.com)**

```
Ctrl + Shift + Delete
→ Cochez "Images et fichiers en cache"
→ Période: "Dernière heure"
→ Effacer les données
```

Ou plus simple:
```
Ctrl + Shift + R (recharge forcée)
```

#### **B. Cache Vercel (si nécessaire)**

**Dans le dashboard Vercel:**
1. Allez sur votre projet
2. Settings → General
3. Cherchez "Clear Cache"
4. Cliquez sur "Clear"

---

### **Étape 4: Tester le Widget**

1. **Fermez COMPLÈTEMENT votre navigateur**
2. **Rouvrez-le**
3. **Allez sur d3drone.com**
4. **Ouvrez la console (F12)**
5. **Cliquez sur le widget**
6. **Écrivez un message**
7. **Cliquez sur Envoyer**

**Résultat attendu:**
```
✅ Widget Chatbot initialisé pour: widget_d3drone
✅ Pas d'erreur
✅ Message envoyé
```

---

## 🔄 Alternative: Ajouter un Timestamp au Script

Si le problème persiste, modifiez le script d'intégration sur d3drone.com:

### **AVANT:**
```html
<script>
  (function() {
    var chatbot = document.createElement('script');
    chatbot.src = 'https://unif-conversation.vercel.app/widget.js';
    chatbot.setAttribute('data-chatbot-id', 'widget_d3drone');
    document.body.appendChild(chatbot);
  })();
</script>
```

### **APRÈS (avec timestamp):**
```html
<script>
  (function() {
    var chatbot = document.createElement('script');
    chatbot.src = 'https://unif-conversation.vercel.app/widget.js?v=' + Date.now();
    chatbot.setAttribute('data-chatbot-id', 'widget_d3drone');
    document.body.appendChild(chatbot);
  })();
</script>
```

**Le `?v=` + timestamp force le navigateur à recharger le fichier à chaque fois.**

---

## 🧪 Test de Vérification

### **Console du Navigateur (F12):**

**Tapez ceci dans la console:**
```javascript
fetch('https://unif-conversation.vercel.app/widget.js')
  .then(r => r.text())
  .then(code => {
    if (code.includes('typeof window !== \'undefined\'')) {
      console.log('✅ Widget corrigé!');
    } else {
      console.log('❌ Ancienne version');
    }
  });
```

**Résultat attendu:**
```
✅ Widget corrigé!
```

---

## 📋 Checklist de Dépannage

- [ ] Fichier local `public/widget.js` corrigé (ligne 270)
- [ ] Redéployé avec `--force`
- [ ] Déploiement terminé avec succès
- [ ] URL Vercel notée
- [ ] Cache navigateur vidé (Ctrl+Shift+R)
- [ ] Navigateur fermé et rouvert
- [ ] Widget testé sur d3drone.com
- [ ] Console vérifiée (pas d'erreur)
- [ ] Message envoyé avec succès
- [ ] Conversation visible dans l'admin

---

## 🆘 Si Ça Ne Fonctionne TOUJOURS Pas

### **Option 1: Créer une Nouvelle Version du Widget**

**Renommez le fichier:**
```
public/widget.js → public/widget-v2.js
```

**Mettez à jour le script sur d3drone.com:**
```html
chatbot.src = 'https://unif-conversation.vercel.app/widget-v2.js';
```

**Redéployez:**
```powershell
npx vercel --prod
```

---

### **Option 2: Vérifier le Build**

**Testez le build localement:**
```powershell
npm run build
```

**Vérifiez que `dist/widget.js` existe et contient la correction.**

---

### **Option 3: Vérifier les Logs Vercel**

**Dans le terminal:**
```powershell
npx vercel logs
```

**Cherchez des erreurs de build ou de déploiement.**

---

## 🎯 Commandes Utiles

### **Redéployer avec force:**
```powershell
npx vercel --prod --force
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

## 📊 Vérification Finale

### **1. Fichier Source (Local)**
```powershell
# Ouvrir le fichier
notepad public\widget.js

# Chercher la ligne 270
# Devrait contenir: typeof window !== 'undefined'
```

### **2. Fichier Déployé (Vercel)**
```
Ouvrir: https://unif-conversation.vercel.app/widget.js
Chercher: typeof window !== 'undefined'
```

### **3. Console Navigateur (d3drone.com)**
```
F12 → Console
Devrait afficher: Widget Chatbot initialisé
PAS d'erreur: Cannot read properties of undefined
```

---

## 🎊 Résultat Attendu

**Après le redéploiement forcé:**

1. **Sur d3drone.com:**
   - ✅ Widget s'affiche
   - ✅ Widget s'ouvre au clic
   - ✅ Message peut être écrit
   - ✅ Bouton Envoyer fonctionne
   - ✅ Message envoyé avec succès
   - ✅ Pas d'erreur dans la console

2. **Dans l'admin:**
   - ✅ Conversation créée
   - ✅ Message du client visible
   - ✅ Peut répondre au client

3. **Console (F12):**
   ```
   ✅ Widget Chatbot initialisé pour: widget_d3drone
   ✅ Pas d'erreur
   ```

---

**Lancez le redéploiement forcé maintenant!** 🚀

```powershell
npx vercel --prod --force
```

**Répondez Y et attendez 2-3 minutes!**
