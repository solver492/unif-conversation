# 📝 Scripts d'Intégration pour vos Sites Web

## ⚠️ IMPORTANT

**Après le déploiement sur Vercel, remplacez `VOTRE-URL-VERCEL` par votre vraie URL!**

Exemple: Si votre URL est `https://chatbot-admin-abc123.vercel.app`, remplacez partout `VOTRE-URL-VERCEL` par `chatbot-admin-abc123.vercel.app`

---

## 🌐 Script pour D3Drone.com

### **À copier dans le fichier HTML de d3drone.com, avant `</body>`:**

```html
<!-- Widget Chatbot D3Drone -->
<script>
  (function() {
    var chatbot = document.createElement('script');
    chatbot.src = 'https://VOTRE-URL-VERCEL/widget.js';
    chatbot.setAttribute('data-chatbot-id', 'widget_d3drone');
    document.body.appendChild(chatbot);
  })();
</script>
```

### **Où le placer?**

```html
<!DOCTYPE html>
<html>
<head>
    <title>D3Drone</title>
    <!-- Vos autres balises head -->
</head>
<body>
    <!-- Votre contenu -->
    
    <!-- ⬇️ AJOUTEZ LE SCRIPT ICI, JUSTE AVANT </body> -->
    <script>
      (function() {
        var chatbot = document.createElement('script');
        chatbot.src = 'https://VOTRE-URL-VERCEL/widget.js';
        chatbot.setAttribute('data-chatbot-id', 'widget_d3drone');
        document.body.appendChild(chatbot);
      })();
    </script>
</body>
</html>
```

---

## 🌐 Script pour MonAuxiliaire.com

### **À copier dans le fichier HTML de monauxiliaire.com, avant `</body>`:**

```html
<!-- Widget Chatbot MonAuxiliaire -->
<script>
  (function() {
    var chatbot = document.createElement('script');
    chatbot.src = 'https://VOTRE-URL-VERCEL/widget.js';
    chatbot.setAttribute('data-chatbot-id', 'widget_monauxiliaire');
    document.body.appendChild(chatbot);
  })();
</script>
```

---

## 🌐 Script pour Rhilkom.com

### **À copier dans le fichier HTML de rhilkom.com, avant `</body>`:**

```html
<!-- Widget Chatbot Rhilkom -->
<script>
  (function() {
    var chatbot = document.createElement('script');
    chatbot.src = 'https://VOTRE-URL-VERCEL/widget.js';
    chatbot.setAttribute('data-chatbot-id', 'widget_rhilkom');
    document.body.appendChild(chatbot);
  })();
</script>
```

---

## 🎨 Personnalisation du Widget

### **Changer la Position:**

```html
<script>
  (function() {
    var chatbot = document.createElement('script');
    chatbot.src = 'https://VOTRE-URL-VERCEL/widget.js';
    chatbot.setAttribute('data-chatbot-id', 'widget_d3drone');
    chatbot.setAttribute('data-position', 'bottom-left'); // ou 'bottom-right'
    document.body.appendChild(chatbot);
  })();
</script>
```

### **Changer les Couleurs:**

```html
<script>
  (function() {
    var chatbot = document.createElement('script');
    chatbot.src = 'https://VOTRE-URL-VERCEL/widget.js';
    chatbot.setAttribute('data-chatbot-id', 'widget_d3drone');
    chatbot.setAttribute('data-primary-color', '#FF6B6B'); // Couleur principale
    chatbot.setAttribute('data-secondary-color', '#4ECDC4'); // Couleur secondaire
    document.body.appendChild(chatbot);
  })();
</script>
```

---

## 🔧 Pour WordPress

### **Méthode 1: Via le Thème**

1. Allez dans **Apparence → Éditeur de thème**
2. Ouvrez **footer.php**
3. Ajoutez le script avant `<?php wp_footer(); ?>`
4. Sauvegardez

### **Méthode 2: Via un Plugin**

1. Installez le plugin **"Insert Headers and Footers"**
2. Allez dans **Réglages → Insert Headers and Footers**
3. Collez le script dans **"Scripts in Footer"**
4. Sauvegardez

---

## 🔧 Pour Shopify

1. Allez dans **Boutique en ligne → Thèmes**
2. Cliquez sur **Actions → Modifier le code**
3. Ouvrez **theme.liquid**
4. Ajoutez le script avant `</body>`
5. Sauvegardez

---

## 🔧 Pour Wix

1. Allez dans **Paramètres → Outils de suivi et analytics**
2. Cliquez sur **+ Nouvel outil → Code personnalisé**
3. Collez le script
4. Sélectionnez **"Body - end"**
5. Appliquez à **"Toutes les pages"**
6. Sauvegardez

---

## 🔧 Pour Webflow

1. Allez dans **Project Settings → Custom Code**
2. Collez le script dans **"Footer Code"**
3. Sauvegardez
4. Publiez le site

---

## ✅ Vérification

### **Après avoir ajouté le script:**

1. **Ouvrez votre site web**
2. **Vous devriez voir:**
   - Un bouton rond en bas à droite (ou gauche)
   - Avec une icône de chat
   - Couleur violette/bleue

3. **Cliquez dessus:**
   - Une fenêtre de chat s'ouvre
   - Message de bienvenue affiché
   - Vous pouvez écrire un message

4. **Envoyez un message de test:**
   - Écrivez "Test"
   - Cliquez sur Envoyer
   - Le message apparaît

5. **Vérifiez dans l'admin:**
   - Ouvrez votre application admin
   - Allez dans "Conversations"
   - Attendez 5 secondes (polling)
   - La conversation apparaît!

---

## 🐛 Dépannage

### **Le widget ne s'affiche pas:**

1. **Vérifiez la console du navigateur (F12):**
   - Erreurs JavaScript?
   - Erreur de chargement du script?

2. **Vérifiez l'URL du script:**
   - Est-ce que `https://VOTRE-URL-VERCEL/widget.js` est accessible?
   - Ouvrez l'URL directement dans le navigateur

3. **Vérifiez le `data-chatbot-id`:**
   - Correspond-il au `script_id` dans votre admin?

### **Le widget s'affiche mais ne fonctionne pas:**

1. **Vérifiez Supabase:**
   - Les clés API sont-elles correctes?
   - Les tables existent-elles?

2. **Vérifiez le chatbot:**
   - Existe-t-il dans la base de données?
   - Le `script_id` est-il correct?

### **La conversation n'apparaît pas dans l'admin:**

1. **Attendez 5 secondes** (polling)
2. **Rafraîchissez la page**
3. **Vérifiez dans Supabase:**
   - Table Editor → conversations
   - La conversation est-elle là?

---

## 📊 Statistiques

### **Pour voir combien de visiteurs utilisent le widget:**

1. Allez dans **Supabase Dashboard**
2. **Table Editor → conversations**
3. Comptez les lignes
4. Filtrez par `chatbot_id` pour voir par site

---

## 🎯 Prochaines Étapes

Après avoir intégré le widget:

1. **Testez sur chaque site**
2. **Créez les chatbots correspondants**
3. **Personnalisez les messages de bienvenue**
4. **Configurez les prompts système**
5. **Ajoutez de la base de connaissances**
6. **Surveillez les conversations**
7. **Répondez à vos clients!**

---

## 🎊 C'est Tout!

**Vos sites web sont maintenant équipés d'un chatbot intelligent!**

**Vos clients peuvent:**
- ✅ Poser des questions 24/7
- ✅ Obtenir des réponses instantanées
- ✅ Contacter un agent humain si besoin

**Vous pouvez:**
- ✅ Gérer toutes les conversations depuis un seul endroit
- ✅ Répondre depuis n'importe où
- ✅ Voir l'historique complet
- ✅ Analyser les demandes

**Le tout gratuitement!** 🎉
