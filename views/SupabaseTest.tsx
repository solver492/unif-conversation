import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { chatbotService, conversationService, messageService } from '../services/supabaseService';

const SupabaseTest: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);
    const [testing, setTesting] = useState(false);

    const addResult = (test: string, status: 'success' | 'error' | 'warning', message: string, details?: any) => {
        setResults(prev => [...prev, { test, status, message, details, timestamp: Date.now() }]);
    };

    const runTests = async () => {
        setResults([]);
        setTesting(true);

        // Test 1: Configuration
        addResult('Configuration', 'success', 'Checking environment variables...');
        const hasUrl = !!import.meta.env.VITE_SUPABASE_URL;
        const hasKey = !!import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (hasUrl && hasKey) {
            addResult('Configuration', 'success', '✅ Variables d\'environnement présentes', {
                url: import.meta.env.VITE_SUPABASE_URL,
                keyPresent: true
            });
        } else {
            addResult('Configuration', 'error', '❌ Variables manquantes', { hasUrl, hasKey });
        }

        // Test 2: Connexion basique
        addResult('Connection', 'success', 'Testing basic connection...');
        try {
            const { data, error } = await supabase.from('chatbots').select('count');
            if (error) throw error;
            addResult('Connection', 'success', '✅ Connexion Supabase réussie', data);
        } catch (err: any) {
            addResult('Connection', 'error', '❌ Échec de connexion', err.message);
        }

        // Test 3: Tables
        addResult('Tables', 'success', 'Checking database tables...');
        const tables = ['chatbots', 'clients', 'conversations', 'messages', 'media_files', 'knowledge_base_items'];
        let tablesOk = 0;
        
        for (const table of tables) {
            try {
                const { error } = await supabase.from(table).select('count').limit(1);
                if (error) throw error;
                tablesOk++;
            } catch (err: any) {
                addResult('Tables', 'error', `❌ Table "${table}" non trouvée`, err.message);
            }
        }
        
        if (tablesOk === tables.length) {
            addResult('Tables', 'success', `✅ Toutes les tables existent (${tablesOk}/${tables.length})`);
        } else {
            addResult('Tables', 'warning', `⚠️ Certaines tables manquent (${tablesOk}/${tables.length})`);
        }

        // Test 4: Lire les chatbots
        addResult('Read', 'success', 'Reading chatbots...');
        try {
            const chatbots = await chatbotService.getAll();
            addResult('Read', 'success', `✅ ${chatbots.length} chatbot(s) trouvé(s)`, chatbots);
        } catch (err: any) {
            addResult('Read', 'error', '❌ Erreur lecture chatbots', err.message);
        }

        // Test 5: Créer un chatbot de test
        addResult('Write', 'success', 'Creating test chatbot...');
        try {
            const testBot = await chatbotService.create({
                name: 'Test Bot ' + Date.now(),
                description: 'Bot de test automatique',
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
            addResult('Write', 'success', '✅ Chatbot créé avec succès', { id: testBot.id, name: testBot.name });

            // Nettoyer
            await chatbotService.delete(testBot.id);
            addResult('Write', 'success', '✅ Chatbot de test supprimé');
        } catch (err: any) {
            addResult('Write', 'error', '❌ Erreur création chatbot', err.message);
        }

        // Test 6: Storage
        addResult('Storage', 'success', 'Checking storage buckets...');
        try {
            const { data, error } = await supabase.storage.listBuckets();
            if (error) throw error;
            
            const mediaBucket = data.find(b => b.name === 'media');
            if (mediaBucket) {
                addResult('Storage', 'success', '✅ Bucket "media" existe', {
                    public: mediaBucket.public,
                    id: mediaBucket.id
                });
            } else {
                addResult('Storage', 'warning', '⚠️ Bucket "media" non trouvé - à créer manuellement');
            }
        } catch (err: any) {
            addResult('Storage', 'error', '❌ Erreur storage', err.message);
        }

        // Test 7: Conversations
        addResult('Conversations', 'success', 'Reading conversations...');
        try {
            const conversations = await conversationService.getAll();
            addResult('Conversations', 'success', `✅ ${conversations.length} conversation(s) trouvée(s)`, conversations);
        } catch (err: any) {
            addResult('Conversations', 'error', '❌ Erreur lecture conversations', err.message);
        }

        setTesting(false);
        addResult('Complete', 'success', '🎉 Tests terminés!');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'text-green-400';
            case 'error': return 'text-red-400';
            case 'warning': return 'text-yellow-400';
            default: return 'text-slate-400';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            default: return '🔍';
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-900 p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-white mb-2">🧪 Test de Connexion Supabase</h1>
                <p className="text-slate-400">Vérification complète de l'intégration Supabase</p>
            </header>

            <div className="mb-6">
                <button
                    onClick={runTests}
                    disabled={testing}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        testing
                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                    {testing ? '⏳ Tests en cours...' : '▶️ Lancer les Tests'}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-800 rounded-lg p-4 space-y-2">
                {results.length === 0 ? (
                    <div className="text-center text-slate-500 py-12">
                        <p className="text-lg mb-2">Aucun test exécuté</p>
                        <p className="text-sm">Cliquez sur "Lancer les Tests" pour commencer</p>
                    </div>
                ) : (
                    results.map((result, index) => (
                        <div
                            key={index}
                            className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">{getStatusIcon(result.status)}</span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-white">{result.test}</span>
                                        <span className={`text-sm ${getStatusColor(result.status)}`}>
                                            {result.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className={getStatusColor(result.status)}>{result.message}</p>
                                    {result.details && (
                                        <details className="mt-2">
                                            <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-300">
                                                Voir les détails
                                            </summary>
                                            <pre className="mt-2 text-xs bg-slate-900 p-2 rounded overflow-x-auto text-slate-300">
                                                {JSON.stringify(result.details, null, 2)}
                                            </pre>
                                        </details>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 bg-slate-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">📋 Informations de Configuration</h3>
                <div className="space-y-1 text-sm">
                    <div className="flex gap-2">
                        <span className="text-slate-400">URL Supabase:</span>
                        <span className="text-white font-mono">{import.meta.env.VITE_SUPABASE_URL || '❌ Non configuré'}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-slate-400">Clé API:</span>
                        <span className="text-white">{import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Présente' : '❌ Manquante'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupabaseTest;
