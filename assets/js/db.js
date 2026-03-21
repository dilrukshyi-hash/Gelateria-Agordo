/**
 * GelatoDB - A simple IndexedDB wrapper for the Ice Cream Shop
 */
class GelatoDB {
    constructor() {
        this.dbName = 'GelatariyaDB';
        this.dbVersion = 4;



        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                // Migration: Clear old data to refresh with new version
                if (event.oldVersion < 4) {
                    if (db.objectStoreNames.contains('products')) {
                        db.deleteObjectStore('products');
                    }
                    if (db.objectStoreNames.contains('messages')) {
                        db.deleteObjectStore('messages');
                    }
                }


                
                // Products Store
                if (!db.objectStoreNames.contains('products')) {
                    db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
                }
                // Messages Store
                if (!db.objectStoreNames.contains('messages')) {
                    db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
                }
            };


            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async add(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async update(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async delete(storeName, id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(Number(id));

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async seedInitialData() {
        const products = await this.getAll('products');
        if (products.length === 0) {
            const initialProducts = [
                { name: 'Sogno di Fragola', price: 4.50, category: 'Frutta', description: 'Fragole fresche biologiche frullate con latte cremoso.', isBestSeller: true, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=800' },
                { name: 'Velluto al Cioccolato', price: 5.00, category: 'Classici', description: 'Profondo cioccolato fondente belga con un finale vellutato.', isBestSeller: true, image: 'https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?auto=format&fit=crop&q=80&w=800' },
                { name: 'Menta Fresca', price: 4.20, category: 'Rinfrescanti', description: 'Menta fresca con scaglie di cioccolato fondente croccanti.', isBestSeller: false, image: 'https://images.unsplash.com/photo-1532678465554-94840274c297?auto=format&fit=crop&q=80&w=800' },
                { name: 'Mango Tango', price: 4.80, category: 'Tropicali', description: 'Purea di mango Alphonso piccante con un tocco di lime.', isBestSeller: false, image: 'https://images.unsplash.com/photo-1505394033343-431d1b3fe3d9?auto=format&fit=crop&q=80&w=800' }


            ];
            for (const prod of initialProducts) {
                await this.add('products', prod);
            }
        }
    }


}

const gelatoDB = new GelatoDB();
window.gelatoDB = gelatoDB; // Expose globally for simplicity in other scripts
