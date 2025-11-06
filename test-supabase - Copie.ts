// ============================================
// TEST DE CONNEXION SUPABASE
// ============================================

import { supabase } from './services/supabaseClient';
import { chatbotService } from './services/supabaseService';

async function testSupabaseConnection() {
    console.log('🔍 Testing Supabase Connection...\n');

    // Test 1: Vérifier la configuration
    console.log('1️⃣ Configuration Check:');
    console.log('   URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('   Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Present' : '❌ Missing');
    console.log('');

    // Test 2: Connexion basique
    console.log('2️⃣ Basic Connection Test:');
    try {
        const { data, error } = await supabase.from('chatbots').select('count');
        if (error) {
            console.error('   ❌ Connection failed:', error.message);
            console.error('   Details:', error);
        } else {
            console.log('   ✅ Connection successful!');
            console.log('   Response:', data);
        }
    } catch (err: any) {
        console.error('   ❌ Exception:', err.message);
    }
    console.log('');

    // Test 3: Lire les chatbots
    console.log('3️⃣ Read Chatbots Test:');
    try {
        const chatbots = await chatbotService.getAll();
        console.log(`   ✅ Found ${chatbots.length} chatbot(s)`);
        if (chatbots.length > 0) {
            console.log('   First chatbot:', chatbots[0].name);
        }
    } catch (err: any) {
        console.error('   ❌ Error:', err.message);
    }
    console.log('');

    // Test 4: Créer un chatbot de test
    console.log('4️⃣ Create Chatbot Test:');
    try {
        const testBot = await chatbotService.create({
            name: 'Test Bot',
            description: 'Bot de test',
            system_prompt: 'You are a test assistant',
            script_id: `test_${Date.now()}`,
            is_active: true,
            conversation_count: 0,
            colors: { primary: '#3B82F6', secondary: '#FFFFFF' },
            widget_config: {
                header_title: 'Test Bot',
                welcome_message: 'Hello!',
                position: 'bottom-right'
            },
            knowledge_base: []
        });
        console.log('   ✅ Chatbot created:', testBot.name);
        console.log('   ID:', testBot.id);

        // Nettoyer - supprimer le bot de test
        await chatbotService.delete(testBot.id);
        console.log('   ✅ Test chatbot deleted');
    } catch (err: any) {
        console.error('   ❌ Error:', err.message);
    }
    console.log('');

    // Test 5: Vérifier les tables
    console.log('5️⃣ Tables Check:');
    const tables = ['chatbots', 'clients', 'conversations', 'messages', 'media_files', 'knowledge_base_items'];
    for (const table of tables) {
        try {
            const { error } = await supabase.from(table).select('count').limit(1);
            if (error) {
                console.log(`   ❌ ${table}: ${error.message}`);
            } else {
                console.log(`   ✅ ${table}: OK`);
            }
        } catch (err: any) {
            console.log(`   ❌ ${table}: ${err.message}`);
        }
    }
    console.log('');

    // Test 6: Vérifier le storage
    console.log('6️⃣ Storage Check:');
    try {
        const { data, error } = await supabase.storage.listBuckets();
        if (error) {
            console.error('   ❌ Storage error:', error.message);
        } else {
            console.log(`   ✅ Found ${data.length} bucket(s)`);
            const mediaBucket = data.find(b => b.name === 'media');
            if (mediaBucket) {
                console.log('   ✅ Media bucket exists');
                console.log('   Public:', mediaBucket.public ? 'Yes' : 'No');
            } else {
                console.log('   ⚠️  Media bucket not found - needs to be created');
            }
        }
    } catch (err: any) {
        console.error('   ❌ Exception:', err.message);
    }
    console.log('');

    console.log('✅ Supabase Connection Test Complete!\n');
}

// Exécuter le test
testSupabaseConnection().catch(console.error);
