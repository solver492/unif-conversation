# 🚀 Configuration Supabase - Guide Complet

## 📋 Prérequis

- Compte Supabase créé sur [supabase.com](https://supabase.com)
- Projet Supabase créé
- Clés API récupérées

## 🔑 Vos Clés API

```
URL du projet: https://lpisexhe1b9.supabase.co
Clé publique (anon): sb_publishable__lpisexhe1b9_HINfYyZGg_-oQnCzmV
Clé secrète (service_role): sb_secret_MK4EbrrXRZtxkskXiA_9CQ_h8jo2vl7
```

## ⚙️ Étape 1: Configuration des Variables d'Environnement

✅ **DÉJÀ FAIT** - Les variables sont dans `.env.local`:

```env
GEMINI_API_KEY=AIzaSyDc1FJ9-tFrk8d9lHe9zMcifKE47xP5oG8

# Supabase Configuration
VITE_SUPABASE_URL=https://lpisexhe1b9.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable__lpisexhe1b9_HINfYyZGg_-oQnCzmV
SUPABASE_SERVICE_ROLE_KEY=sb_secret_MK4EbrrXRZtxkskXiA_9CQ_h8jo2vl7
```

## 📦 Étape 2: Installation des Dépendances

✅ **DÉJÀ FAIT** - Le package Supabase est installé:

```bash
npm install @supabase/supabase-js
```

## 🗄️ Étape 3: Créer la Base de Données

### Option A: Via l'Interface Supabase (RECOMMANDÉ)

1. **Allez sur votre projet Supabase:**
   - URL: https://supabase.com/dashboard/project/lpisexhe1b9

2. **Ouvrez le SQL Editor:**
   - Menu latéral → SQL Editor
   - Cliquez sur "New query"

3. **Copiez le contenu de `supabase/schema.sql`:**
   - Ouvrez le fichier `supabase/schema.sql`
   - Copiez tout le contenu
   - Collez dans l'éditeur SQL

4. **Exécutez le script:**
   - Cliquez sur "Run" ou appuyez sur Ctrl+Enter
   - Attendez la confirmation: "Success. No rows returned"

5. **Vérifiez les tables créées:**
   - Menu latéral → Table Editor
   - Vous devriez voir:
     - ✅ chatbots
     - ✅ clients
     - ✅ conversations
     - ✅ messages
     - ✅ media_files
     - ✅ knowledge_base_items

### Option B: Via CLI Supabase (Avancé)

```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter
supabase login

# Lier le projet
supabase link --project-ref lpisexhe1b9

# Appliquer les migrations
supabase db push
```

## 🪣 Étape 4: Créer le Bucket de Stockage

1. **Allez dans Storage:**
   - Menu latéral → Storage
   - Cliquez sur "Create a new bucket"

2. **Créez le bucket "media":**
   - Name: `media`
   - Public bucket: ✅ Coché
   - Cliquez sur "Create bucket"

3. **Configurez les politiques:**
   - Sélectionnez le bucket "media"
   - Onglet "Policies"
   - Cliquez sur "New policy"
   - Sélectionnez "For full customization"
   - Nom: "Allow public uploads"
   - Policy definition:
   ```sql
   CREATE POLICY "Allow public uploads"
   ON storage.objects FOR INSERT
   TO public
   WITH CHECK (bucket_id = 'media');
   ```

## 🔄 Étape 5: Tester la Connexion

### Test Rapide dans la Console

1. **Ouvrez la console du navigateur** (F12)

2. **Testez la connexion:**
```javascript
// Dans la console du navigateur
import { supabase } from './services/supabaseClient';

// Tester la connexion
const { data, error } = await supabase.from('chatbots').select('*');
console.log('Chatbots:', data);
```

### Test avec l'Application

1. **Démarrez l'application:**
```bash
npm run dev
```

2. **Allez dans "Mes Chatbots"**

3. **Créez un nouveau chatbot** - Il sera sauvegardé dans Supabase!

## 📊 Structure de la Base de Données

### Tables Créées:

#### 1. **chatbots** (Agents)
```
- id (UUID)
- name (TEXT)
- description (TEXT)
- avatar_url (TEXT)
- system_prompt (TEXT)
- is_active (BOOLEAN)
- conversation_count (INTEGER)
- script_id (TEXT UNIQUE)
- colors (JSONB)
- widget_config (JSONB)
- knowledge_base (JSONB)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 2. **clients**
```
- id (UUID)
- name (TEXT)
- email (TEXT)
- avatar_url (TEXT)
- origin (TEXT)
- location (JSONB)
- visit_info (JSONB)
- created_at (TIMESTAMP)
```

#### 3. **conversations**
```
- id (UUID)
- chatbot_id (UUID → chatbots)
- client_id (UUID → clients)
- status (TEXT: active/pending/resolved)
- is_bot_active (BOOLEAN)
- assigned_agent (TEXT)
- unread_count (INTEGER)
- last_message_snippet (TEXT)
- last_message_time (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 4. **messages**
```
- id (UUID)
- conversation_id (UUID → conversations)
- sender_type (TEXT: client/ai/agent)
- content (TEXT)
- attachments (JSONB)
- created_at (TIMESTAMP)
```

#### 5. **media_files**
```
- id (UUID)
- conversation_id (UUID → conversations)
- file_name (TEXT)
- file_type (TEXT)
- file_url (TEXT)
- file_size (INTEGER)
- uploaded_by (TEXT)
- created_at (TIMESTAMP)
```

#### 6. **knowledge_base_items**
```
- id (UUID)
- chatbot_id (UUID → chatbots)
- type (TEXT: url/file/text)
- content (TEXT)
- title (TEXT)
- status (TEXT: processing/indexed/error)
- created_at (TIMESTAMP)
```

## 🔥 Fonctionnalités Automatiques

### Triggers Créés:

1. **update_updated_at_column**
   - Met à jour automatiquement `updated_at` sur les chatbots et conversations

2. **update_conversation_count**
   - Incrémente/décrémente automatiquement le compteur de conversations des chatbots

3. **update_last_message**
   - Met à jour automatiquement `last_message_snippet` et `last_message_time`
   - Incrémente `unread_count` pour les messages clients

### Indexes pour Performance:

- ✅ Conversations par chatbot
- ✅ Conversations par client
- ✅ Conversations par statut
- ✅ Messages par conversation
- ✅ Messages par date
- ✅ Media par conversation
- ✅ Knowledge base par chatbot

## 🔒 Sécurité (RLS)

**Row Level Security activé** sur toutes les tables.

**Politiques actuelles:** Accès public (pour développement)

**TODO pour production:**
- Ajouter authentification utilisateur
- Restreindre l'accès par utilisateur
- Ajouter des rôles (admin, agent, viewer)

## 🧪 Tester les Fonctionnalités

### 1. Créer un Chatbot
```typescript
import { chatbotService } from './services/supabaseService';

const newBot = await chatbotService.create({
    name: 'D3Drone Support',
    description: 'Assistant pour D3Drone',
    system_prompt: 'You are a helpful assistant...',
    script_id: 'widget_d3drone_123',
    is_active: true,
    conversation_count: 0,
    colors: { primary: '#3B82F6', secondary: '#FFFFFF' },
    widget_config: {},
    knowledge_base: []
});
```

### 2. Créer une Conversation
```typescript
import { conversationService, clientService } from './services/supabaseService';

// Créer le client
const client = await clientService.create({
    name: 'Maria Garcia',
    email: 'maria@example.com',
    avatar_url: 'https://i.pravatar.cc/40?u=maria',
    origin: 'Website',
    location: { city: 'Madrid', country: 'Spain' },
    visit_info: {}
});

// Créer la conversation
const conversation = await conversationService.create({
    chatbot_id: 'uuid-du-chatbot',
    client_id: client.id,
    status: 'active'
});
```

### 3. Envoyer un Message
```typescript
import { messageService } from './services/supabaseService';

const message = await messageService.create({
    conversation_id: 'uuid-de-la-conversation',
    sender_type: 'client',
    content: 'Bonjour, j\'ai besoin d\'aide',
    attachments: []
});
```

### 4. Écouter en Temps Réel
```typescript
import { realtimeService } from './services/supabaseService';

// Écouter les nouvelles conversations
const subscription = realtimeService.subscribeToConversations((conversation) => {
    console.log('Nouvelle conversation:', conversation);
    // Afficher une notification
});

// Se désabonner plus tard
subscription.unsubscribe();
```

## 🎯 Prochaines Étapes

1. ✅ **Configuration terminée**
2. ✅ **Base de données créée**
3. ✅ **Services Supabase prêts**
4. 🔄 **Migrer localStorage vers Supabase** (prochaine étape)
5. 🔄 **Ajouter authentification**
6. 🔄 **Déployer en production**

## 🆘 Dépannage

### Erreur: "Missing Supabase environment variables"
- Vérifiez que `.env.local` contient les bonnes clés
- Redémarrez le serveur de développement: `npm run dev`

### Erreur: "relation does not exist"
- Les tables n'ont pas été créées
- Exécutez le script SQL dans l'éditeur Supabase

### Erreur: "permission denied"
- Vérifiez les politiques RLS
- Utilisez la clé `service_role` pour les opérations admin

### Pas de données en temps réel
- Vérifiez que Realtime est activé dans les paramètres du projet
- Database → Replication → Activez les tables nécessaires

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Realtime](https://supabase.com/docs/guides/realtime)
- [Storage](https://supabase.com/docs/guides/storage)

---

**🎉 Configuration Supabase Terminée!**

Votre application est maintenant prête à utiliser Supabase comme backend!
