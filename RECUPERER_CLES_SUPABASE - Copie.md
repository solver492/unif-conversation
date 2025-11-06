# 🔑 Comment Récupérer vos Vraies Clés API Supabase

## ❌ Problème Actuel

L'erreur `ERR_NAME_NOT_RESOLVED` signifie que les clés API ne sont pas au bon format.

Les clés que vous m'avez données:
```
sb_publishable__lpisexhe1b9_HINfYyZGg_-oQnCzmV
sb_secret_MK4EbrrXRZtxkskXiA_9CQ_h8jo2vl7
```

**Ce ne sont PAS les vraies clés API!** ❌

Les vraies clés Supabase sont des **JWT tokens** qui ressemblent à:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaXNleGhlMWI5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MDI4MDAsImV4cCI6MjA0NjQ3ODgwMH0.HINfYyZGg_-oQnCzmV
```

---

## ✅ Comment Récupérer les Vraies Clés

### **Étape 1: Ouvrir votre Projet Supabase**

1. **Allez sur:**
   ```
   https://supabase.com/dashboard
   ```

2. **Connectez-vous** si nécessaire

3. **Sélectionnez votre projet** (celui qui contient "lpisexhe1b9")

---

### **Étape 2: Accéder aux Paramètres**

1. **Dans le menu latéral gauche, cliquez sur:**
   ```
   ⚙️ Settings (Paramètres)
   ```

2. **Puis cliquez sur:**
   ```
   🔑 API
   ```

---

### **Étape 3: Copier les Clés**

Vous verrez une page avec plusieurs sections:

#### **Section 1: Project URL**
```
URL: https://lpisexhe1b9.supabase.co
```
✅ Cette URL est correcte!

#### **Section 2: Project API keys**

Vous verrez 2 clés importantes:

##### **A. anon / public**
```
Nom: anon public
Clé: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaXNleGhlMWI5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MDI4MDAsImV4cCI6MjA0NjQ3ODgwMH0.XXXXXXXXXXXXXX
```

**C'est cette clé qu'il faut copier pour `VITE_SUPABASE_ANON_KEY`!**

##### **B. service_role / secret**
```
Nom: service_role secret
Clé: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaXNleGhlMWI5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDkwMjgwMCwiZXhwIjoyMDQ2NDc4ODAwfQ.XXXXXXXXXXXXXX
```

**C'est cette clé qu'il faut copier pour `SUPABASE_SERVICE_ROLE_KEY`!**

---

### **Étape 4: Copier les Clés**

1. **Pour la clé `anon public`:**
   - Cliquez sur l'icône 👁️ pour révéler la clé
   - Cliquez sur l'icône 📋 pour copier
   - La clé commence par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.`

2. **Pour la clé `service_role`:**
   - Cliquez sur l'icône 👁️ pour révéler la clé
   - Cliquez sur l'icône 📋 pour copier
   - La clé commence aussi par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.`

---

### **Étape 5: Mettre à Jour .env.local**

1. **Ouvrez le fichier:**
   ```
   .env.local
   ```

2. **Remplacez les valeurs:**
   ```env
   GEMINI_API_KEY=AIzaSyDc1FJ9-tFrk8d9lHe9zMcifKE47xP5oG8

   # Supabase Configuration
   VITE_SUPABASE_URL=https://lpisexhe1b9.supabase.co
   VITE_SUPABASE_ANON_KEY=COLLEZ_ICI_LA_CLE_ANON_PUBLIC
   SUPABASE_SERVICE_ROLE_KEY=COLLEZ_ICI_LA_CLE_SERVICE_ROLE
   ```

3. **Exemple de résultat final:**
   ```env
   GEMINI_API_KEY=AIzaSyDc1FJ9-tFrk8d9lHe9zMcifKE47xP5oG8

   # Supabase Configuration
   VITE_SUPABASE_URL=https://lpisexhe1b9.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaXNleGhlMWI5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MDI4MDAsImV4cCI6MjA0NjQ3ODgwMH0.dGhpc19pc19hX2Zha2Vfa2V5X2V4YW1wbGU
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaXNleGhlMWI5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDkwMjgwMCwiZXhwIjoyMDQ2NDc4ODAwfQ.dGhpc19pc19hX2Zha2Vfa2V5X2V4YW1wbGU
   ```

4. **Sauvegardez le fichier**

---

### **Étape 6: Redémarrer le Serveur**

1. **Arrêtez le serveur** (Ctrl+C dans le terminal)

2. **Relancez:**
   ```bash
   npm run dev
   ```

3. **Attendez que le serveur démarre**

4. **Rafraîchissez le navigateur** (F5)

5. **Cliquez sur "▶️ Lancer les Tests"**

---

## 🎯 Vérification des Clés

### **Les vraies clés Supabase:**

✅ **Commencent toujours par:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.`

✅ **Sont très longues** (plusieurs centaines de caractères)

✅ **Contiennent 3 parties séparées par des points:** `header.payload.signature`

❌ **Ne commencent PAS par:** `sb_publishable_` ou `sb_secret_`

---

## 📸 Capture d'Écran du Dashboard

Voici où trouver les clés dans le dashboard:

```
Dashboard Supabase
    ↓
⚙️ Settings (menu latéral)
    ↓
🔑 API
    ↓
Project API keys
    ↓
┌─────────────────────────────────────────┐
│ anon public                             │
│ 👁️ 📋                                   │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ service_role secret                     │
│ 👁️ 📋                                   │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │
└─────────────────────────────────────────┘
```

---

## 🆘 Si Vous Ne Trouvez Pas les Clés

### **Vérifiez que vous êtes sur le bon projet:**

1. **En haut de la page, vérifiez le nom du projet**

2. **L'URL doit contenir:** `lpisexhe1b9`

3. **Si ce n'est pas le cas:**
   - Cliquez sur le nom du projet en haut
   - Sélectionnez le bon projet dans la liste

---

## ✅ Après Avoir Mis à Jour les Clés

### **Les tests devraient maintenant fonctionner!**

**Résultats attendus:**
```
✅ Configuration - SUCCESS
   ✅ Variables d'environnement présentes
   URL: https://lpisexhe1b9.supabase.co
   Key: ✅ Présente

✅ Connection - SUCCESS
   ✅ Connexion Supabase réussie

❌ Tables - ERROR (si pas encore créées)
   ❌ Table "chatbots" non trouvée
   
... etc
```

**Si vous voyez "✅ Connection - SUCCESS", c'est gagné!** 🎉

---

## 🔗 Lien Direct

**Accès rapide aux clés API:**
```
https://supabase.com/dashboard/project/lpisexhe1b9/settings/api
```

---

## 📝 Checklist

- [ ] Ouvrir Supabase Dashboard
- [ ] Aller dans Settings → API
- [ ] Copier la clé "anon public"
- [ ] Copier la clé "service_role secret"
- [ ] Mettre à jour .env.local
- [ ] Vérifier que les clés commencent par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.`
- [ ] Sauvegarder .env.local
- [ ] Redémarrer le serveur (npm run dev)
- [ ] Rafraîchir le navigateur
- [ ] Lancer les tests
- [ ] Vérifier "✅ Connection - SUCCESS"

---

**Une fois les vraies clés en place, tout fonctionnera parfaitement!** 🚀
