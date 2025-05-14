document.addEventListener('DOMContentLoaded', function () {
    // Initialize inventory data from localStorage or use default data
    let inventoryData = loadFromLocalStorage('inventoryData') || [
        {
            id: "INV001",
            name: "Sement",
            category: "Tikinti Materialı",
            quantity: 120,
            unit: "kg",
            minLevel: 200,
            status: "critical",
            lastUpdated: "12.05.2025"
        },
        {
            id: "INV002",
            name: "Armatur (12mm)",
            category: "Metal",
            quantity: 45,
            unit: "ədəd",
            minLevel: 100,
            status: "critical",
            lastUpdated: "11.05.2025"
        },
        {
            id: "INV003",
            name: "Kərpic",
            category: "Tikinti Materialı",
            quantity: 350,
            unit: "ədəd",
            minLevel: 500,
            status: "low",
            lastUpdated: "10.05.2025"
        },
        {
            id: "INV004",
            name: "Qum",
            category: "Tikinti Materialı",
            quantity: 1200,
            unit: "kg",
            minLevel: 500,
            status: "normal",
            lastUpdated: "09.05.2025"
        },
        {
            id: "INV005",
            name: "Taxta",
            category: "Tikinti Materialı",
            quantity: 85,
            unit: "ədəd",
            minLevel: 50,
            status: "normal",
            lastUpdated: "08.05.2025"
        },
        {
            id: "INV006",
            name: "Beton Qarışdırıcı",
            category: "Avadanlıq",
            quantity: 3,
            unit: "ədəd",
            minLevel: 2,
            status: "normal",
            lastUpdated: "07.05.2025"
        },
        {
            id: "INV007",
            name: "Generator",
            category: "Avadanlıq",
            quantity: 2,
            unit: "ədəd",
            minLevel: 1,
            status: "normal",
            lastUpdated: "06.05.2025"
        }
    ];

    // Initialize orders data from localStorage or use default data
    let ordersData = loadFromLocalStorage('ordersData') || [
        {
            id: "ORD001",
            material: "Sement",
            quantity: 500,
            unit: "kg",
            date: "10.05.2025",
            status: "pending",
            supplier: "Bakı Tikinti Materialları"
        },
        {
            id: "ORD002",
            material: "Armatur (12mm)",
            quantity: 200,
            unit: "ədəd",
            date: "09.05.2025",
            status: "confirmed",
            supplier: "Metal Təchizat MMC"
        },
        {
            id: "ORD003",
            material: "Kərpic",
            quantity: 1000,
            unit: "ədəd",
            date: "05.05.2025",
            status: "shipping",
            supplier: "Sumqayıt Tikinti"
        },
        {
            id: "ORD004",
            material: "Qum",
            quantity: 2000,
            unit: "kg",
            date: "01.05.2025",
            status: "completed",
            supplier: "Abşeron Tikinti"
        }
    ];

    // Initialize users data from localStorage or use default data
    let usersData = loadFromLocalStorage('usersData') || [
        {
            name: "Əli Məmmədov",
            email: "ali.m@example.com",
            role: "Admin",
            status: "active",
            registrationDate: "01.01.2025"
        },
        {
            name: "Vüsal Əliyev",
            email: "vusal.a@example.com",
            role: "Menecer",
            status: "active",
            registrationDate: "15.01.2025"
        },
        {
            name: "Səbinə Hüseynova",
            email: "sabina.h@example.com",
            role: "Menecer",
            status: "active",
            registrationDate: "20.01.2025"
        },
        {
            name: "Rəşad Quliyev",
            email: "rashad.q@example.com",
            role: "İşçi",
            status: "active",
            registrationDate: "01.02.2025"
        },
        {
            name: "Aynur Əhmədova",
            email: "aynur.a@example.com",
            role: "İşçi",
            status: "inactive",
            registrationDate: "15.02.2025"
        }
    ];

    // Initialize suppliers data from localStorage or use default data
    let suppliersData = loadFromLocalStorage('suppliersData') || [
        {
            id: "SUP001",
            name: "Bakı Tikinti Materialları",
            contact: "Elşən Məmmədov",
            phone: "+994 50 123 45 67",
            email: "info@btm.az",
            address: "Bakı şəh., Xətai r., Babək pr. 12",
            status: "active"
        },
        {
            id: "SUP002",
            name: "Metal Təchizat MMC",
            contact: "Anar Hüseynov",
            phone: "+994 55 234 56 78",
            email: "info@metaltechizat.az",
            address: "Bakı şəh., Binəqədi r., Azadlıq pr. 154",
            status: "active"
        },
        {
            id: "SUP003",
            name: "Sumqayıt Tikinti",
            contact: "Leyla Əliyeva",
            phone: "+994 70 345 67 89",
            email: "info@sumtikinti.az",
            address: "Sumqayıt şəh., Sülh küç. 45",
            status: "active"
        },
        {
            id: "SUP004",
            name: "Abşeron Tikinti",
            contact: "Kamran Nəsirov",
            phone: "+994 77 456 78 90",
            email: "info@absheron.az",
            address: "Xırdalan şəh., H.Əliyev pr. 23",
            status: "active"
        }
    ];

    // Save initial data to localStorage if not already there
    saveToLocalStorage('inventoryData', inventoryData);
    saveToLocalStorage('ordersData', ordersData);
    saveToLocalStorage('usersData', usersData);
    saveToLocalStorage('suppliersData', suppliersData);

    // Load inventory tables
    loadInventoryTable(inventoryData, 'inventoryTable');
    loadInventoryTable(inventoryData, 'inventoryTablePage');

    // Load orders table
    loadOrdersTable(ordersData);

    // Load users table
    loadUsersTable(usersData);

    // Load suppliers table
    loadSuppliersTable(suppliersData);

    // Initialize date pickers
    initializeDatePickers();

    // Helper function to save data to localStorage
    function saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            showToast('Məlumatları saxlamaq mümkün olmadı', 'error');
        }
    }

    // Helper function to load data from localStorage
    function loadFromLocalStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            showToast('Məlumatları yükləmək mümkün olmadı', 'error');
            return null;
        }
    }

    // Initialize date pickers
    function initializeDatePickers() {
        // Convert all date inputs to have type="date"
        document.querySelectorAll('input[data-type="date"]').forEach(input => {
            input.type = 'date';

            // Set default value to today if not already set
            if (!input.value) {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                input.value = `${year}-${month}-${day}`;
            }
        });
    }

    // Format date from yyyy-mm-dd to dd.mm.yyyy
    function formatDate(dateString) {
        if (!dateString) return '';

        // Check if date is already in dd.mm.yyyy format
        if (dateString.includes('.')) return dateString;

        const parts = dateString.split('-');
        if (parts.length !== 3) return dateString;

        return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }

    // Parse date from dd.mm.yyyy to yyyy-mm-dd
    function parseDate(dateString) {
        if (!dateString) return '';

        // Check if date is already in yyyy-mm-dd format
        if (dateString.includes('-')) return dateString;

        const parts = dateString.split('.');
        if (parts.length !== 3) return dateString;

        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    // Load inventory table function
    function loadInventoryTable(data, tableId) {
        const tableBody = document.querySelector(`#${tableId} tbody`);
        if (!tableBody) return;

        tableBody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');

            // Status badge class based on status
            let statusBadgeClass = '';
            switch (item.status) {
                case 'critical':
                    statusBadgeClass = 'badge-critical';
                    break;
                case 'low':
                    statusBadgeClass = 'badge-low';
                    break;
                default:
                    statusBadgeClass = 'badge-normal';
            }

            // Status text based on status
            let statusText = '';
            switch (item.status) {
                case 'critical':
                    statusText = 'Kritik';
                    break;
                case 'low':
                    statusText = 'Aşağı';
                    break;
                default:
                    statusText = 'Normal';
            }

            row.innerHTML = `
                <td class="font-medium">${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td class="text-right">${item.quantity} ${item.unit}</td>
                <td><span class="badge ${statusBadgeClass}">${statusText}</span></td>
                <td>${item.lastUpdated}</td>
                <td class="text-right">
                    <div class="row-actions">
                        <button class="action-btn increase-btn" data-id="${item.id}" title="Artır">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="action-btn decrease-btn" data-id="${item.id}" title="Azalt">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${item.id}" title="Sil">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });

        // Add event listeners to action buttons
        addInventoryActionListeners(tableId);
    }

    // Add event listeners to inventory action buttons
    function addInventoryActionListeners(tableId) {
        const table = document.getElementById(tableId);
        if (!table) return;

        // Increase quantity buttons
        table.querySelectorAll('.increase-btn').forEach(button => {
            button.addEventListener('click', function () {
                const itemId = this.getAttribute('data-id');
                increaseQuantity(itemId);
            });
        });

        // Decrease quantity buttons
        table.querySelectorAll('.decrease-btn').forEach(button => {
            button.addEventListener('click', function () {
                const itemId = this.getAttribute('data-id');
                decreaseQuantity(itemId);
            });
        });

        // Delete buttons
        table.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const itemId = this.getAttribute('data-id');
                deleteInventoryItem(itemId);
            });
        });
    }

    // Load orders table function
    function loadOrdersTable(data) {
        const tableBody = document.querySelector('#ordersTable tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        data.forEach(order => {
            const row = document.createElement('tr');

            // Status badge class based on status
            let statusBadgeClass = '';
            let statusText = '';

            switch (order.status) {
                case 'pending':
                    statusBadgeClass = 'badge-pending';
                    statusText = 'Gözləyir';
                    break;
                case 'confirmed':
                    statusBadgeClass = 'badge-confirmed';
                    statusText = 'Təsdiqlənib';
                    break;
                case 'shipping':
                    statusBadgeClass = 'badge-shipping';
                    statusText = 'Yoldadır';
                    break;
                case 'completed':
                    statusBadgeClass = 'badge-completed';
                    statusText = 'Tamamlanıb';
                    break;
            }

            // Only show confirm button for orders that are not completed
            const confirmButton = order.status !== 'completed' ?
                `<button class="action-btn confirm-order-btn" data-id="${order.id}" title="Təsdiqlə">
                    <i class="fas fa-check"></i>
                </button>` : '';

            row.innerHTML = `
                <td class="font-medium">${order.id}</td>
                <td>${order.material}</td>
                <td>${order.quantity} ${order.unit}</td>
                <td>${order.date}</td>
                <td><span class="badge ${statusBadgeClass}">${statusText}</span></td>
                <td>${order.supplier}</td>
                <td class="text-right">
                    <div class="row-actions">
                        ${confirmButton}
                        <button class="action-btn view-order-btn" data-id="${order.id}" title="Bax">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn delete-order-btn" data-id="${order.id}" title="Sil">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });

        // Add event listeners to order action buttons
        document.querySelectorAll('.delete-order-btn').forEach(button => {
            button.addEventListener('click', function () {
                const orderId = this.getAttribute('data-id');
                deleteOrder(orderId);
            });
        });

        // Add event listeners to confirm order buttons
        document.querySelectorAll('.confirm-order-btn').forEach(button => {
            button.addEventListener('click', function () {
                const orderId = this.getAttribute('data-id');
                confirmOrder(orderId);
            });
        });
    }

    // Load suppliers table function
    function loadSuppliersTable(data) {
        const tableBody = document.querySelector('#suppliersTable tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        data.forEach(supplier => {
            const row = document.createElement('tr');

            // Status badge class based on status
            let statusBadgeClass = supplier.status === 'active' ? 'badge-normal' : 'badge-critical';
            let statusText = supplier.status === 'active' ? 'Aktiv' : 'Qeyri-aktiv';

            row.innerHTML = `
                <td class="font-medium">${supplier.id}</td>
                <td>${supplier.name}</td>
                <td>${supplier.contact}</td>
                <td>${supplier.phone}</td>
                <td>${supplier.email}</td>
                <td><span class="badge ${statusBadgeClass}">${statusText}</span></td>
                <td class="text-right">
                    <div class="row-actions">
                        <button class="action-btn edit-supplier-btn" data-id="${supplier.id}" title="Düzəliş et">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-supplier-btn" data-id="${supplier.id}" title="Sil">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });

        // Add event listeners to supplier action buttons
        document.querySelectorAll('.edit-supplier-btn').forEach(button => {
            button.addEventListener('click', function () {
                const supplierId = this.getAttribute('data-id');
                editSupplier(supplierId);
            });
        });

        document.querySelectorAll('.delete-supplier-btn').forEach(button => {
            button.addEventListener('click', function () {
                const supplierId = this.getAttribute('data-id');
                deleteSupplier(supplierId);
            });
        });
    }

    // Confirm order function
    function confirmOrder(orderId) {
        const order = ordersData.find(order => order.id === orderId);
        if (!order) return;

        // Check if order is already completed
        if (order.status === 'completed') {
            showToast('Bu sifariş artıq tamamlanıb', 'info');
            return;
        }

        // Find matching inventory item or create new one
        let inventoryItem = inventoryData.find(item => item.name === order.material);

        if (inventoryItem) {
            // Update existing inventory item
            inventoryItem.quantity += order.quantity;

            // Update status based on new quantity
            if (inventoryItem.quantity > inventoryItem.minLevel) {
                inventoryItem.status = 'normal';
            } else if (inventoryItem.quantity > inventoryItem.minLevel * 0.5) {
                inventoryItem.status = 'low';
            }

            // Update last updated date
            inventoryItem.lastUpdated = new Date().toLocaleDateString('az-AZ');
        } else {
            // Create new inventory item
            const newItemId = `INV${String(inventoryData.length + 1).padStart(3, '0')}`;

            // Determine category based on material name (simplified logic)
            let category = 'Tikinti Materialı';
            if (order.material.toLowerCase().includes('armatur')) {
                category = 'Metal';
            } else if (order.material.toLowerCase().includes('avadanlıq') ||
                order.material.toLowerCase().includes('generator') ||
                order.material.toLowerCase().includes('qarışdırıcı')) {
                category = 'Avadanlıq';
            }

            // Determine min level (simplified logic)
            const minLevel = Math.round(order.quantity * 0.2);

            inventoryItem = {
                id: newItemId,
                name: order.material,
                category: category,
                quantity: order.quantity,
                unit: order.unit,
                minLevel: minLevel,
                status: 'normal',
                lastUpdated: new Date().toLocaleDateString('az-AZ')
            };

            // Add to inventory data
            inventoryData.push(inventoryItem);
        }

        // Update order status to completed
        order.status = 'completed';

        // Save changes to localStorage
        saveToLocalStorage('inventoryData', inventoryData);
        saveToLocalStorage('ordersData', ordersData);

        // Reload tables
        loadInventoryTable(inventoryData, 'inventoryTable');
        loadInventoryTable(inventoryData, 'inventoryTablePage');
        loadOrdersTable(ordersData);

        // Show success toast
        showToast(`${order.material} sifarişi təsdiqləndi və inventara əlavə edildi`, 'success');
    }

    // Load users table function
    function loadUsersTable(data) {
        const tableBody = document.querySelector('#usersTable tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        data.forEach(user => {
            const row = document.createElement('tr');

            // Status badge class based on status
            let statusBadgeClass = user.status === 'active' ? 'badge-normal' : 'badge-critical';
            let statusText = user.status === 'active' ? 'Aktiv' : 'Qeyri-aktiv';

            // Get initials for avatar
            const nameParts = user.name.split(' ');
            const initials = nameParts.map(part => part.charAt(0)).join('');

            row.innerHTML = `
                <td>
                    <div class="user-info">
                        <div class="avatar">${initials}</div>
                        <span>${user.name}</span>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td><span class="badge ${statusBadgeClass}">${statusText}</span></td>
                <td>${user.registrationDate}</td>
                <td class="text-right">
                    <div class="row-actions">
                        <button class="action-btn edit-user-btn" data-email="${user.email}" title="Düzəliş et">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-user-btn" data-email="${user.email}" title="Sil">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });

        // Add event listeners to user action buttons
        document.querySelectorAll('.delete-user-btn').forEach(button => {
            button.addEventListener('click', function () {
                const userEmail = this.getAttribute('data-email');
                deleteUser(userEmail);
            });
        });
    }

    // Search functionality for inventory table
    const inventorySearch = document.getElementById('inventorySearch');
    if (inventorySearch) {
        inventorySearch.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const filteredData = inventoryData.filter(item =>
                item.name.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm)
            );
            loadInventoryTable(filteredData, 'inventoryTable');
        });
    }

    // Search functionality for inventory page
    const inventorySearchPage = document.getElementById('inventorySearchPage');
    if (inventorySearchPage) {
        inventorySearchPage.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const filteredData = inventoryData.filter(item =>
                item.name.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm)
            );
            loadInventoryTable(filteredData, 'inventoryTablePage');
        });
    }

    // Category filter for inventory page
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function () {
            filterInventory();
        });
    }

    // Status filter for inventory page
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function () {
            filterInventory();
        });
    }

    // Filter inventory function
    function filterInventory() {
        const categoryValue = categoryFilter ? categoryFilter.value : '';
        const statusValue = statusFilter ? statusFilter.value : '';
        const searchTerm = inventorySearchPage ? inventorySearchPage.value.toLowerCase() : '';

        let filteredData = inventoryData;

        if (searchTerm) {
            filteredData = filteredData.filter(item =>
                item.name.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm)
            );
        }

        if (categoryValue) {
            filteredData = filteredData.filter(item => item.category === categoryValue);
        }

        if (statusValue) {
            filteredData = filteredData.filter(item => item.status === statusValue);
        }

        loadInventoryTable(filteredData, 'inventoryTablePage');
    }

    // Search functionality for orders table
    const orderSearch = document.getElementById('orderSearch');
    if (orderSearch) {
        orderSearch.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const filteredData = ordersData.filter(order =>
                order.material.toLowerCase().includes(searchTerm) ||
                order.supplier.toLowerCase().includes(searchTerm)
            );
            loadOrdersTable(filteredData);
        });
    }

    // Order status filter
    const orderStatusFilter = document.getElementById('orderStatusFilter');
    if (orderStatusFilter) {
        orderStatusFilter.addEventListener('change', function () {
            const statusValue = this.value;
            let filteredData = ordersData;

            if (statusValue) {
                filteredData = filteredData.filter(order => order.status === statusValue);
            }

            loadOrdersTable(filteredData);
        });
    }

    // Search functionality for users table
    const userSearch = document.getElementById('userSearch');
    if (userSearch) {
        userSearch.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const filteredData = usersData.filter(user =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );
            loadUsersTable(filteredData);
        });
    }

    // Search functionality for suppliers table
    const supplierSearch = document.getElementById('supplierSearch');
    if (supplierSearch) {
        supplierSearch.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const filteredData = suppliersData.filter(supplier =>
                supplier.name.toLowerCase().includes(searchTerm) ||
                supplier.contact.toLowerCase().includes(searchTerm) ||
                supplier.email.toLowerCase().includes(searchTerm)
            );
            loadSuppliersTable(filteredData);
        });
    }

    // Role filter for users
    const roleFilter = document.getElementById('roleFilter');
    if (roleFilter) {
        roleFilter.addEventListener('change', function () {
            filterUsers();
        });
    }

    // Status filter for users
    const userStatusFilter = document.getElementById('statusFilter');
    if (userStatusFilter) {
        userStatusFilter.addEventListener('change', function () {
            filterUsers();
        });
    }

    // Filter users function
    function filterUsers() {
        const roleValue = roleFilter ? roleFilter.value : '';
        const statusValue = userStatusFilter ? userStatusFilter.value : '';
        const searchTerm = userSearch ? userSearch.value.toLowerCase() : '';

        let filteredData = usersData;

        if (searchTerm) {
            filteredData = filteredData.filter(user =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );
        }

        if (roleValue) {
            filteredData = filteredData.filter(user => user.role === roleValue);
        }

        if (statusValue) {
            filteredData = filteredData.filter(user => user.status === statusValue);
        }

        loadUsersTable(filteredData);
    }

    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons and content
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Sidebar navigation
    const navItems = document.querySelectorAll('.sidebar-nav li');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Handle page switching
            const pageName = this.getAttribute('data-page');
            switchPage(pageName);

            // Save active page to localStorage
            localStorage.setItem('activePage', pageName);
        });
    });

    // Switch page function
    function switchPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const selectedPage = document.getElementById(pageName);
        if (selectedPage) {
            selectedPage.classList.add('active');
        }
    }

    // Load active page from localStorage
    const activePage = localStorage.getItem('activePage');
    if (activePage) {
        switchPage(activePage);
        // Set active class on sidebar item
        const activeNavItem = document.querySelector(`.sidebar-nav li[data-page="${activePage}"]`);
        if (activeNavItem) {
            document.querySelectorAll('.sidebar-nav li').forEach(item => item.classList.remove('active'));
            activeNavItem.classList.add('active');
        }
    }

    // Initialize Chart.js for inventory chart
    const ctx = document.getElementById('inventoryChart');
    if (ctx) {
        const inventoryChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1 May', '5 May', '10 May', '15 May', '20 May', '25 May', '30 May'],
                datasets: [
                    {
                        label: 'Sement',
                        data: [50, 60, 45, 70, 55, 65, 75],
                        backgroundColor: '#4f46e5',
                        borderRadius: 4
                    },
                    {
                        label: 'Armatur',
                        data: [20, 15, 25, 30, 20, 35, 25],
                        backgroundColor: '#0ea5e9',
                        borderRadius: 4
                    },
                    {
                        label: 'Kərpic',
                        data: [30, 40, 35, 25, 45, 30, 50],
                        backgroundColor: '#f59e0b',
                        borderRadius: 4
                    },
                    {
                        label: 'Qum',
                        data: [45, 30, 50, 40, 35, 55, 40],
                        backgroundColor: '#10b981',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Show report functionality
    const showReportButtons = document.querySelectorAll('.show-report');
    showReportButtons.forEach(button => {
        button.addEventListener('click', function () {
            const reportType = this.getAttribute('data-report');
            showReport(reportType);
        });
    });

    // Show report function
    function showReport(reportType) {
        const reportDisplay = document.getElementById('reportDisplay');
        const reportTitle = document.getElementById('reportTitle');
        const reportData = document.getElementById('reportData');
        const reportChart = document.getElementById('reportChart');

        if (!reportDisplay || !reportTitle || !reportData || !reportChart) return;

        // Show report display
        reportDisplay.style.display = 'block';

        // Set report title and data based on report type
        switch (reportType) {
            case 'monthly':
            case 'monthly-usage':
                reportTitle.textContent = 'Aylıq Material İstifadəsi - May 2025';
                createUsageChart(reportChart, 'month');
                reportData.innerHTML = createMonthlyUsageTable();
                break;
            case 'weekly':
            case 'weekly-usage':
                reportTitle.textContent = 'Həftəlik Material İstifadəsi - 6-12 May, 2025';
                createUsageChart(reportChart, 'week');
                reportData.innerHTML = createWeeklyUsageTable();
                break;
            case 'monthly-orders':
                reportTitle.textContent = 'Aylıq Sifarişlər - May 2025';
                createOrdersChart(reportChart);
                reportData.innerHTML = createMonthlyOrdersTable();
                break;
            case 'weekly-orders':
                reportTitle.textContent = 'Həftəlik Sifarişlər - 6-12 May, 2025';
                createOrdersChart(reportChart, 'week');
                reportData.innerHTML = createWeeklyOrdersTable();
                break;
            case 'monthly-expenses':
                reportTitle.textContent = 'Aylıq Xərc Analizi - May 2025';
                createExpensesChart(reportChart);
                reportData.innerHTML = createMonthlyExpensesTable();
                break;
        }
    }

    // Create usage chart
    function createUsageChart(canvas, period = 'month') {
        // Destroy existing chart if any
        if (window.reportChartInstance) {
            window.reportChartInstance.destroy();
        }

        // Create labels based on period
        let labels = [];
        if (period === 'week') {
            labels = ['6 May', '7 May', '8 May', '9 May', '10 May', '11 May', '12 May'];
        } else {
            labels = ['1 May', '5 May', '10 May', '15 May', '20 May', '25 May', '30 May'];
        }

        // Create chart
        window.reportChartInstance = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Sement (kg)',
                        data: period === 'week' ? [15, 20, 10, 25, 15, 5, 10] : [50, 60, 45, 70, 55, 65, 75],
                        backgroundColor: '#4f46e5',
                        borderRadius: 4
                    },
                    {
                        label: 'Armatur (ədəd)',
                        data: period === 'week' ? [5, 8, 3, 10, 7, 2, 5] : [20, 15, 25, 30, 20, 35, 25],
                        backgroundColor: '#0ea5e9',
                        borderRadius: 4
                    },
                    {
                        label: 'Kərpic (ədəd)',
                        data: period === 'week' ? [10, 15, 5, 20, 10, 5, 15] : [30, 40, 35, 25, 45, 30, 50],
                        backgroundColor: '#f59e0b',
                        borderRadius: 4
                    },
                    {
                        label: 'Qum (kg)',
                        data: period === 'week' ? [20, 10, 15, 25, 20, 10, 15] : [45, 30, 50, 40, 35, 55, 40],
                        backgroundColor: '#10b981',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Create orders chart
    function createOrdersChart(canvas, period = 'month') {
        // Destroy existing chart if any
        if (window.reportChartInstance) {
            window.reportChartInstance.destroy();
        }

        // Create labels based on period
        let labels = [];
        if (period === 'week') {
            labels = ['6 May', '7 May', '8 May', '9 May', '10 May', '11 May', '12 May'];
        } else {
            labels = ['1 May', '5 May', '10 May', '15 May', '20 May', '25 May', '30 May'];
        }

        // Create chart
        window.reportChartInstance = new Chart(canvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Sifarişlər',
                        data: period === 'week' ? [2, 1, 3, 2, 4, 1, 2] : [5, 3, 7, 4, 6, 3, 8],
                        borderColor: '#4f46e5',
                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Create expenses chart
    function createExpensesChart(canvas) {
        // Destroy existing chart if any
        if (window.reportChartInstance) {
            window.reportChartInstance.destroy();
        }

        // Create chart
        window.reportChartInstance = new Chart(canvas, {
            type: 'pie',
            data: {
                labels: ['Tikinti Materialı', 'Metal', 'Avadanlıq', 'Digər'],
                datasets: [
                    {
                        data: [45, 25, 20, 10],
                        backgroundColor: ['#4f46e5', '#0ea5e9', '#f59e0b', '#10b981'],
                        borderWidth: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Create monthly usage table
    function createMonthlyUsageTable() {
        return `
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Kateqoriya</th>
                            <th class="text-right">İstifadə Olunan</th>
                            <th class="text-right">Qalan</th>
                            <th class="text-right">Dəyər</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sement</td>
                            <td>Tikinti Materialı</td>
                            <td class="text-right">320 kg</td>
                            <td class="text-right">120 kg</td>
                            <td class="text-right">640 AZN</td>
                        </tr>
                        <tr>
                            <td>Armatur (12mm)</td>
                            <td>Metal</td>
                            <td class="text-right">150 ədəd</td>
                            <td class="text-right">45 ədəd</td>
                            <td class="text-right">750 AZN</td>
                        </tr>
                        <tr>
                            <td>Kərpic</td>
                            <td>Tikinti Materialı</td>
                            <td class="text-right">650 ədəd</td>
                            <td class="text-right">350 ədəd</td>
                            <td class="text-right">520 AZN</td>
                        </tr>
                        <tr>
                            <td>Qum</td>
                            <td>Tikinti Materialı</td>
                            <td class="text-right">800 kg</td>
                            <td class="text-right">1200 kg</td>
                            <td class="text-right">160 AZN</td>
                        </tr>
                        <tr>
                            <td>Taxta</td>
                            <td>Tikinti Materialı</td>
                            <td class="text-right">45 ədəd</td>
                            <td class="text-right">85 ədəd</td>
                            <td class="text-right">450 AZN</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4" class="text-right"><strong>Ümumi:</strong></td>
                            <td class="text-right"><strong>2,520 AZN</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;
    }

    // Create weekly usage table
    function createWeeklyUsageTable() {
        return `
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Kateqoriya</th>
                            <th class="text-right">İstifadə Olunan</th>
                            <th class="text-right">Dəyər</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sement</td>
                            <td>Tikinti Materialı</td>
                            <td class="text-right">100 kg</td>
                            <td class="text-right">200 AZN</td>
                        </tr>
                        <tr>
                            <td>Armatur (12mm)</td>
                            <td>Metal</td>
                            <td class="text-right">40 ədəd</td>
                            <td class="text-right">200 AZN</td>
                        </tr>
                        <tr>
                            <td>Kərpic</td>
                            <td>Tikinti Materialı</td>
                            <td class="text-right">150 ədəd</td>
                            <td class="text-right">120 AZN</td>
                        </tr>
                        <tr>
                            <td>Qum</td>
                            <td>Tikinti Materialı</td>
                            <td class="text-right">200 kg</td>
                            <td class="text-right">40 AZN</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-right"><strong>Ümumi:</strong></td>
                            <td class="text-right"><strong>560 AZN</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;
    }

    // Create monthly orders table
    function createMonthlyOrdersTable() {
        return `
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Material</th>
                            <th>Miqdar</th>
                            <th>Tarix</th>
                            <th>Status</th>
                            <th class="text-right">Dəyər</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ORD001</td>
                            <td>Sement</td>
                            <td>500 kg</td>
                            <td>10.05.2025</td>
                            <td><span class="badge badge-pending">Gözləyir</span></td>
                            <td class="text-right">1,000 AZN</td>
                        </tr>
                        <tr>
                            <td>ORD002</td>
                            <td>Armatur (12mm)</td>
                            <td>200 ədəd</td>
                            <td>09.05.2025</td>
                            <td><span class="badge badge-confirmed">Təsdiqlənib</span></td>
                            <td class="text-right">1,000 AZN</td>
                        </tr>
                        <tr>
                            <td>ORD003</td>
                            <td>Kərpic</td>
                            <td>1000 ədəd</td>
                            <td>05.05.2025</td>
                            <td><span class="badge badge-shipping">Yoldadır</span></td>
                            <td class="text-right">800 AZN</td>
                        </tr>
                        <tr>
                            <td>ORD004</td>
                            <td>Qum</td>
                            <td>2000 kg</td>
                            <td>01.05.2025</td>
                            <td><span class="badge badge-completed">Tamamlanıb</span></td>
                            <td class="text-right">400 AZN</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5" class="text-right"><strong>Ümumi:</strong></td>
                            <td class="text-right"><strong>3,200 AZN</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;
    }

    // Create weekly orders table
    function createWeeklyOrdersTable() {
        return `
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Material</th>
                            <th>Miqdar</th>
                            <th>Tarix</th>
                            <th>Status</th>
                            <th class="text-right">Dəyər</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ORD001</td>
                            <td>Sement</td>
                            <td>500 kg</td>
                            <td>10.05.2025</td>
                            <td><span class="badge badge-pending">Gözləyir</span></td>
                            <td class="text-right">1,000 AZN</td>
                        </tr>
                        <tr>
                            <td>ORD002</td>
                            <td>Armatur (12mm)</td>
                            <td>200 ədəd</td>
                            <td>09.05.2025</td>
                            <td><span class="badge badge-confirmed">Təsdiqlənib</span></td>
                            <td class="text-right">1,000 AZN</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5" class="text-right"><strong>Ümumi:</strong></td>
                            <td class="text-right"><strong>2,000 AZN</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;
    }

    // Create monthly expenses table
    function createMonthlyExpensesTable() {
        return `
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Kateqoriya</th>
                            <th class="text-right">Miqdar</th>
                            <th class="text-right">Dəyər</th>
                            <th class="text-right">Faiz</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tikinti Materialı</td>
                            <td class="text-right">12 material</td>
                            <td class="text-right">2,320 AZN</td>
                            <td class="text-right">45%</td>
                        </tr>
                        <tr>
                            <td>Metal</td>
                            <td class="text-right">5 material</td>
                            <td class="text-right">1,280 AZN</td>
                            <td class="text-right">25%</td>
                        </tr>
                        <tr>
                            <td>Avadanlıq</td>
                            <td class="text-right">3 avadanlıq</td>
                            <td class="text-right">1,024 AZN</td>
                            <td class="text-right">20%</td>
                        </tr>
                        <tr>
                            <td>Digər</td>
                            <td class="text-right">8 material</td>
                            <td class="text-right">512 AZN</td>
                            <td class="text-right">10%</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" class="text-right"><strong>Ümumi:</strong></td>
                            <td class="text-right"><strong>5,136 AZN</strong></td>
                            <td class="text-right"><strong>100%</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;
    }

    // Close report button
    const closeReportButtons = document.querySelectorAll('.close-report');
    closeReportButtons.forEach(button => {
        button.addEventListener('click', function () {
            const reportDisplay = document.getElementById('reportDisplay');
            if (reportDisplay) {
                reportDisplay.style.display = 'none';
            }
        });
    });

    // Export report button
    const exportReportBtn = document.getElementById('exportReportBtn');
    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', function () {
            showToast('Hesabat PDF formatında ixrac edilir...', 'info');
            setTimeout(() => {
                showToast('Hesabat uğurla ixrac edildi!', 'success');
            }, 2000);
        });
    }

    // Print report button
    const printReportBtn = document.getElementById('printReportBtn');
    if (printReportBtn) {
        printReportBtn.addEventListener('click', function () {
            showToast('Hesabat çap edilir...', 'info');
            setTimeout(() => {
                showToast('Hesabat uğurla çap edildi!', 'success');
            }, 2000);
        });
    }

    // Mark all notifications as read
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function () {
            showToast('Bütün bildirişlər oxunmuş kimi qeyd edildi', 'success');
        });
    }

    // Notification settings button
    const notificationSettingsBtn = document.getElementById('notificationSettingsBtn');
    if (notificationSettingsBtn) {
        notificationSettingsBtn.addEventListener('click', function () {
            switchPage('settings');
            // Scroll to notification settings
            const notificationSettings = document.querySelector('.card:nth-child(4)');
            if (notificationSettings) {
                notificationSettings.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Dismiss notification buttons
    const dismissButtons = document.querySelectorAll('.dismiss-btn');
    dismissButtons.forEach(button => {
        button.addEventListener('click', function () {
            const alertItem = this.closest('.alert-item');
            if (alertItem) {
                alertItem.style.opacity = '0';
                setTimeout(() => {
                    alertItem.style.display = 'none';
                }, 300);
            }
        });
    });

    // Order buttons in alerts
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', function () {
            const material = this.getAttribute('data-material');
            openOrderModal(material);
        });
    });

    // Open order modal with material
    function openOrderModal(material) {
        const modal = document.getElementById('newOrderModal');
        const materialSelect = document.getElementById('orderMaterial');
        const unitInput = document.getElementById('orderUnit');
        const supplierSelect = document.getElementById('orderSupplier');

        if (modal && materialSelect) {
            // Clear previous options
            materialSelect.innerHTML = '<option value="">Material Seçin</option>';

            // Add options from inventory data
            inventoryData.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.name;
                option.setAttribute('data-unit', item.unit);
                materialSelect.appendChild(option);
            });

            // Select the material if provided
            if (material) {
                const materialItem = inventoryData.find(item => item.name === material);
                if (materialItem) {
                    const option = materialSelect.querySelector(`option[value="${materialItem.id}"]`);
                    if (option) {
                        option.selected = true;
                        unitInput.value = materialItem.unit;
                    }
                }
            }

            // Clear previous supplier options
            if (supplierSelect) {
                supplierSelect.innerHTML = '<option value="">Təchizatçı Seçin</option>';

                // Add options from suppliers data
                suppliersData.forEach(supplier => {
                    if (supplier.status === 'active') {
                        const option = document.createElement('option');
                        option.value = supplier.name;
                        option.textContent = supplier.name;
                        supplierSelect.appendChild(option);
                    }
                });
            }

            // Show modal
            modal.style.display = 'block';
        }
    }

    // Material select change in order form
    const orderMaterial = document.getElementById('orderMaterial');
    if (orderMaterial) {
        orderMaterial.addEventListener('change', function () {
            const unitInput = document.getElementById('orderUnit');
            const selectedOption = this.options[this.selectedIndex];

            if (unitInput && selectedOption) {
                unitInput.value = selectedOption.getAttribute('data-unit') || '';
            }
        });
    }

    // New order button
    const newOrderBtn = document.getElementById('newOrderBtn');
    if (newOrderBtn) {
        newOrderBtn.addEventListener('click', function () {
            openOrderModal();
        });
    }

    // Add material buttons
    const addMaterialBtns = document.querySelectorAll('#addMaterialBtn, #addMaterialBtnTab, #addMaterialBtnPage');
    addMaterialBtns.forEach(button => {
        button.addEventListener('click', function () {
            openAddMaterialModal();
        });
    });

    // Open add material modal
    function openAddMaterialModal() {
        const modal = document.getElementById('addMaterialModal');
        if (modal) {
            // Reset form
            const form = document.getElementById('addMaterialForm');
            if (form) {
                form.reset();
            }

            // Show modal
            modal.style.display = 'block';
        }
    }

    // Add user button
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function () {
            openAddUserModal();
        });
    }

    // Open add user modal
    function openAddUserModal() {
        const modal = document.getElementById('addUserModal');
        if (modal) {
            // Reset form
            const form = document.getElementById('addUserForm');
            if (form) {
                form.reset();
            }

            // Show modal
            modal.style.display = 'block';
        }
    }

    // Add supplier button
    const addSupplierBtn = document.getElementById('addSupplierBtn');
    if (addSupplierBtn) {
        addSupplierBtn.addEventListener('click', function () {
            openAddSupplierModal();
        });
    }

    // Open add supplier modal
    function openAddSupplierModal() {
        const modal = document.getElementById('addSupplierModal');
        if (modal) {
            // Reset form
            const form = document.getElementById('addSupplierForm');
            if (form) {
                form.reset();
            }

            // Show modal
            modal.style.display = 'block';
        }
    }

    // Edit supplier function
    function editSupplier(supplierId) {
        const supplier = suppliersData.find(supplier => supplier.id === supplierId);
        if (!supplier) return;

        const modal = document.getElementById('editSupplierModal');
        if (!modal) return;

        // Fill form with supplier data
        const nameInput = document.getElementById('editSupplierName');
        const contactInput = document.getElementById('editSupplierContact');
        const phoneInput = document.getElementById('editSupplierPhone');
        const emailInput = document.getElementById('editSupplierEmail');
        const addressInput = document.getElementById('editSupplierAddress');
        const statusSelect = document.getElementById('editSupplierStatus');
        const idInput = document.getElementById('editSupplierId');

        if (nameInput) nameInput.value = supplier.name;
        if (contactInput) contactInput.value = supplier.contact;
        if (phoneInput) phoneInput.value = supplier.phone;
        if (emailInput) emailInput.value = supplier.email;
        if (addressInput) addressInput.value = supplier.address;
        if (statusSelect) statusSelect.value = supplier.status;
        if (idInput) idInput.value = supplier.id;

        // Show modal
        modal.style.display = 'block';
    }

    // Close modal buttons
    const closeModalButtons = document.querySelectorAll('.close-modal, .cancel-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Add material form submit
    const addMaterialForm = document.getElementById('addMaterialForm');
    if (addMaterialForm) {
        addMaterialForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get form data
            const name = document.getElementById('materialName').value;
            const category = document.getElementById('materialCategory').value;
            const quantity = parseInt(document.getElementById('materialQuantity').value);
            const unit = document.getElementById('materialUnit').value;
            const minLevel = parseInt(document.getElementById('materialMinLevel').value);

            // Generate ID
            const id = `INV${String(inventoryData.length + 1).padStart(3, '0')}`;

            // Determine status
            let status = 'normal';
            if (quantity <= minLevel * 0.5) {
                status = 'critical';
            } else if (quantity <= minLevel) {
                status = 'low';
            }

            // Create new material
            const newMaterial = {
                id,
                name,
                category,
                quantity,
                unit,
                minLevel,
                status,
                lastUpdated: new Date().toLocaleDateString('az-AZ')
            };

            // Add to inventory data
            inventoryData.push(newMaterial);

            // Save to localStorage
            saveToLocalStorage('inventoryData', inventoryData);

            // Reload inventory tables
            loadInventoryTable(inventoryData, 'inventoryTable');
            loadInventoryTable(inventoryData, 'inventoryTablePage');

            // Close modal
            document.getElementById('addMaterialModal').style.display = 'none';

            // Show success toast
            showToast(`${name} uğurla əlavə edildi`, 'success');
        });
    }

    // New order form submit
    const newOrderForm = document.getElementById('newOrderForm');
    if (newOrderForm) {
        newOrderForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get form data
            const materialId = document.getElementById('orderMaterial').value;
            const quantity = parseInt(document.getElementById('orderQuantity').value);
            const supplier = document.getElementById('orderSupplier').value;
            const orderDate = document.getElementById('orderDate');

            // Find material
            const material = inventoryData.find(item => item.id === materialId);
            if (!material) {
                showToast('Material tapılmadı', 'error');
                return;
            }

            // Generate ID
            const id = `ORD${String(ordersData.length + 1).padStart(3, '0')}`;

            // Format date
            let date = new Date().toLocaleDateString('az-AZ');
            if (orderDate && orderDate.value) {
                date = formatDate(orderDate.value);
            }

            // Create new order
            const newOrder = {
                id,
                material: material.name,
                quantity,
                unit: material.unit,
                date: date,
                status: 'pending',
                supplier
            };

            // Add to orders data
            ordersData.push(newOrder);

            // Save to localStorage
            saveToLocalStorage('ordersData', ordersData);

            // Reload orders table
            loadOrdersTable(ordersData);

            // Close modal
            document.getElementById('newOrderModal').style.display = 'none';

            // Show success toast
            showToast(`${material.name} üçün sifariş uğurla yaradıldı`, 'success');
        });
    }

    // Add supplier form submit
    const addSupplierForm = document.getElementById('addSupplierForm');
    if (addSupplierForm) {
        addSupplierForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get form data
            const name = document.getElementById('supplierName').value;
            const contact = document.getElementById('supplierContact').value;
            const phone = document.getElementById('supplierPhone').value;
            const email = document.getElementById('supplierEmail').value;
            const address = document.getElementById('supplierAddress').value;

            // Generate ID
            const id = `SUP${String(suppliersData.length + 1).padStart(3, '0')}`;

            // Create new supplier
            const newSupplier = {
                id,
                name,
                contact,
                phone,
                email,
                address,
                status: 'active'
            };

            // Add to suppliers data
            suppliersData.push(newSupplier);

            // Save to localStorage
            saveToLocalStorage('suppliersData', suppliersData);

            // Reload suppliers table
            loadSuppliersTable(suppliersData);

            // Close modal
            document.getElementById('addSupplierModal').style.display = 'none';

            // Show success toast
            showToast(`${name} təchizatçısı uğurla əlavə edildi`, 'success');
        });
    }

    // Edit supplier form submit
    const editSupplierForm = document.getElementById('editSupplierForm');
    if (editSupplierForm) {
        editSupplierForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get form data
            const id = document.getElementById('editSupplierId').value;
            const name = document.getElementById('editSupplierName').value;
            const contact = document.getElementById('editSupplierContact').value;
            const phone = document.getElementById('editSupplierPhone').value;
            const email = document.getElementById('editSupplierEmail').value;
            const address = document.getElementById('editSupplierAddress').value;
            const status = document.getElementById('editSupplierStatus').value;

            // Find supplier
            const supplierIndex = suppliersData.findIndex(supplier => supplier.id === id);
            if (supplierIndex === -1) {
                showToast('Təchizatçı tapılmadı', 'error');
                return;
            }

            // Update supplier
            suppliersData[supplierIndex] = {
                id,
                name,
                contact,
                phone,
                email,
                address,
                status
            };

            // Save to localStorage
            saveToLocalStorage('suppliersData', suppliersData);

            // Reload suppliers table
            loadSuppliersTable(suppliersData);

            // Close modal
            document.getElementById('editSupplierModal').style.display = 'none';

            // Show success toast
            showToast(`${name} təchizatçısı uğurla yeniləndi`, 'success');
        });
    }

    // Delete supplier function
    function deleteSupplier(supplierId) {
        const supplier = suppliersData.find(supplier => supplier.id === supplierId);
        if (supplier) {
            // Confirm deletion
            if (confirm(`${supplier.name} təchizatçısını silmək istədiyinizə əminsiniz?`)) {
                // Remove supplier from suppliers data
                suppliersData = suppliersData.filter(supplier => supplier.id !== supplierId);

                // Save to localStorage
                saveToLocalStorage('suppliersData', suppliersData);

                // Reload suppliers table
                loadSuppliersTable(suppliersData);

                // Show success toast
                showToast(`${supplier.name} təchizatçısı uğurla silindi`, 'success');
            }
        }
    }

    // Add user form submit
    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get form data
            const firstName = document.getElementById('userFirstName').value;
            const lastName = document.getElementById('userLastName').value;
            const email = document.getElementById('userEmail').value;
            const role = document.getElementById('userRole').value;

            // Check if email already exists
            if (usersData.some(user => user.email === email)) {
                showToast('Bu email artıq istifadə olunur', 'error');
                return;
            }

            // Create new user
            const newUser = {
                name: `${firstName} ${lastName}`,
                email,
                role,
                status: 'active',
                registrationDate: new Date().toLocaleDateString('az-AZ')
            };

            // Add to users data
            usersData.push(newUser);

            // Save to localStorage
            saveToLocalStorage('usersData', usersData);

            // Reload users table
            loadUsersTable(usersData);

            // Close modal
            document.getElementById('addUserModal').style.display = 'none';

            // Show success toast
            showToast(`${firstName} ${lastName} uğurla əlavə edildi`, 'success');
        });
    }

    // Profile form submit
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function (event) {
            event.preventDefault();
            showToast('Profil məlumatları uğurla yeniləndi', 'success');
        });
    }

    // Password form submit
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function (event) {
            event.preventDefault();
            showToast('Şifrə uğurla dəyişdirildi', 'success');
        });
    }

    // Save settings button
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function () {
            // Save settings to localStorage
            const autoNotifications = document.getElementById('autoNotifications').checked;
            const autoReports = document.getElementById('autoReports').checked;
            const darkMode = document.getElementById('darkMode').checked;
            const criticalLevel = document.getElementById('criticalLevel').value;

            const settings = {
                autoNotifications,
                autoReports,
                darkMode,
                criticalLevel
            };

            saveToLocalStorage('settings', settings);

            showToast('Tənzimləmələr uğurla yadda saxlanıldı', 'success');
        });
    }

    // Load settings from localStorage
    const settings = loadFromLocalStorage('settings');
    if (settings) {
        const autoNotifications = document.getElementById('autoNotifications');
        const autoReports = document.getElementById('autoReports');
        const darkMode = document.getElementById('darkMode');
        const criticalLevel = document.getElementById('criticalLevel');

        if (autoNotifications) autoNotifications.checked = settings.autoNotifications;
        if (autoReports) autoReports.checked = settings.autoReports;
        if (darkMode) darkMode.checked = settings.darkMode;
        if (criticalLevel) criticalLevel.value = settings.criticalLevel;
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkMode');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function () {
            if (this.checked) {
                document.documentElement.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.documentElement.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        });

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            darkModeToggle.checked = true;
            document.documentElement.classList.add('dark-mode');
        }
    }

    // Increase quantity function
    function increaseQuantity(itemId) {
        const item = inventoryData.find(item => item.id === itemId);
        if (item) {
            // Increase quantity
            item.quantity += 10;

            // Update status
            if (item.quantity > item.minLevel) {
                item.status = 'normal';
            } else if (item.quantity > item.minLevel * 0.5) {
                item.status = 'low';
            }

            // Update last updated date
            item.lastUpdated = new Date().toLocaleDateString('az-AZ');

            // Save to localStorage
            saveToLocalStorage('inventoryData', inventoryData);

            // Reload inventory tables
            loadInventoryTable(inventoryData, 'inventoryTable');
            loadInventoryTable(inventoryData, 'inventoryTablePage');

            // Show success toast
            showToast(`${item.name} miqdarı artırıldı`, 'success');
        }
    }

    // Decrease quantity function
    function decreaseQuantity(itemId) {
        const item = inventoryData.find(item => item.id === itemId);
        if (item) {
            // Prevent negative quantity
            if (item.quantity < 10) {
                showToast(`${item.name} miqdarı 0-dan az ola bilməz`, 'error');
                return;
            }

            // Decrease quantity
            item.quantity -= 10;

            // Update status
            if (item.quantity <= item.minLevel * 0.5) {
                item.status = 'critical';
            } else if (item.quantity <= item.minLevel) {
                item.status = 'low';
            }

            // Update last updated date
            item.lastUpdated = new Date().toLocaleDateString('az-AZ');

            // Save to localStorage
            saveToLocalStorage('inventoryData', inventoryData);

            // Reload inventory tables
            loadInventoryTable(inventoryData, 'inventoryTable');
            loadInventoryTable(inventoryData, 'inventoryTablePage');

            // Show success toast
            showToast(`${item.name} miqdarı azaldıldı`, 'success');

            // Show critical alert if needed
            if (item.status === 'critical') {
                showToast(`${item.name} kritik səviyyəyə düşdü!`, 'warning');
            }
        }
    }

    // Delete inventory item function
    function deleteInventoryItem(itemId) {
        const item = inventoryData.find(item => item.id === itemId);
        if (item) {
            // Confirm deletion
            if (confirm(`${item.name} materialını silmək istədiyinizə əminsiniz?`)) {
                // Remove item from inventory data
                inventoryData = inventoryData.filter(item => item.id !== itemId);

                // Save to localStorage
                saveToLocalStorage('inventoryData', inventoryData);

                // Reload inventory tables
                loadInventoryTable(inventoryData, 'inventoryTable');
                loadInventoryTable(inventoryData, 'inventoryTablePage');

                // Show success toast
                showToast(`${item.name} uğurla silindi`, 'success');
            }
        }
    }

    // Delete order function
    function deleteOrder(orderId) {
        const order = ordersData.find(order => order.id === orderId);
        if (order) {
            // Confirm deletion
            if (confirm(`${order.id} nömrəli sifarişi silmək istədiyinizə əminsiniz?`)) {
                // Remove order from orders data
                ordersData = ordersData.filter(order => order.id !== orderId);

                // Save to localStorage
                saveToLocalStorage('ordersData', ordersData);

                // Reload orders table
                loadOrdersTable(ordersData);

                // Show success toast
                showToast(`${order.id} nömrəli sifariş uğurla silindi`, 'success');
            }
        }
    }

    // Delete user function
    function deleteUser(userEmail) {
        const user = usersData.find(user => user.email === userEmail);
        if (user) {
            // Confirm deletion
            if (confirm(`${user.name} istifadəçisini silmək istədiyinizə əminsiniz?`)) {
                // Remove user from users data
                usersData = usersData.filter(user => user.email !== userEmail);

                // Save to localStorage
                saveToLocalStorage('usersData', usersData);

                // Reload users table
                loadUsersTable(usersData);

                // Show success toast
                showToast(`${user.name} uğurla silindi`, 'success');
            }
        }
    }

    // Show toast notification
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        // Set icon based on type
        let icon = '';
        switch (type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-times-circle"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }

        // Set toast content
        toast.innerHTML = `
            ${icon}
            <div class="toast-message">${message}</div>
            <button class="toast-close">&times;</button>
        `;

        // Add toast to container
        toastContainer.appendChild(toast);

        // Add close event to toast
        toast.querySelector('.toast-close').addEventListener('click', function () {
            toast.remove();
        });

        // Auto remove toast after 5 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }

    const tbody_user_checker = document.getElementById('tbody_user_checker');
    function fetchUserData() {
        fetch('http://localhost:7777/v1/check')
            .then(response => response.json())
            .then(data => {
                tbody_user_checker.innerHTML = '';
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                data.slice(0, 5).forEach(user => {
                    tbody_user_checker.innerHTML += `
          <tr>
            <td></td>
            <td style="text-align: center; width:150px; height:100px">
              <img style="width:100%; height:100%; object-fit:contain" src="data:image/jpeg;base64,${user.image}" />
            </td>
            <td></td>
            <td style="text-align: center;">${user.createdAt}</td>
            <td></td>
            <td style="text-align: center;">Pozuntu aşkarlandı!</td>
          </tr>
        `;
                });
            })
            .catch(error => {
                console.error('Serverdən məlumat alına bilmədi:', error);
            });
    }

    fetchUserData();

    setInterval(fetchUserData, 2000);

});
const weather_input = document.getElementById('cityInput');
const hourlyWeather = document.getElementById('hourlyWeather');
const hourlyWeather_h2 = document.getElementById('hourlyWeather_h2');

const temperatur = async (city = null, lat = null, lon = null) => {
    const apiKey = '077118ed465d578cff1db686007f4f40';
    const weatherTable = document.getElementById('weather-data');
    const location = document.getElementById('location');

    try {
        let currentResponse;
        let forecastResponse;
        if (lat && lon) {
            currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        } else if (city) {
            currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        if (currentResponse.status === 200 && forecastResponse.status === 200) {
            const description = currentData.weather[0].description;
            const now = new Date();
            const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

            location.innerHTML = `${currentData.name}`;

            const currTemp = currentData.main.temp;
            const currWind = currentData.wind.speed;

            let currDanger = "✅";
            if (currTemp > 35) {
                currDanger = "☀️🔥⚠️";
            } else if (currTemp > 25) {
                currDanger = "☀️";
            } else if (currTemp < 0) {
                currDanger = "❄️";
            } else if (currWind > 15) {
                currDanger = "💨⚠️";
            } else if (currWind > 10) {
                currDanger = "💨";
            }
            let tableHTML = `
                <tr>
                    <td></td>
                    <td>${description.charAt(0).toUpperCase() + description.slice(1)}</td>
                    <td></td>
                    <td>${now.toLocaleDateString()}</td>
                    <td></td>
                    <td>${time}</td>
                    <td></td>
                    <td>${currTemp}°C</td>
                    <td></td>
                    <td>${currWind} m/s</td>
                    <td></td>
                    <td>${currDanger}</td>
                </tr>
            `;

            for (let i = 0; i < 20 && i < forecastData.list.length; i++) {
                const item = forecastData.list[i];
                const forecastDate = new Date(item.dt * 1000);
                const date = forecastDate.toLocaleDateString();
                const time = forecastDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

                const weatherDesc = item.weather[0].description;
                const formattedDesc = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);
                const temp = item.main.temp;
                const wind = item.wind.speed;

                let danger = "✅";
                if (currTemp > 35) {
                    danger = "☀️🔥⚠️";
                } else if (currTemp > 25) {
                    danger = "☀️";
                } else if (currTemp < 0) {
                    danger = "❄️";
                } else if (currWind > 15) {
                    danger = "💨⚠️";
                } else if (currWind > 10) {
                    danger = "💨";
                }

                tableHTML += `
                    <tr>
                        <td></td>
                        <td>${formattedDesc}</td>
                        <td></td>
                        <td>${date}</td>
                        <td></td>
                        <td>${time}</td>
                        <td></td>
                        <td>${temp}°C</td>
                        <td></td>
                        <td>${wind} m/s</td>
                        <td></td>
                        <td>${danger}</td>
                    </tr>
                `;
            }

            weatherTable.innerHTML = tableHTML;
            if (hourlyWeather) hourlyWeather.style.display = 'block';
        } else {
            weatherTable.innerHTML = `<tr><td colspan="12">Yalnış ərazi daxil etmisiniz</td></tr>`;
            if (hourlyWeather) hourlyWeather.style.display = 'none';
        }
    } catch (error) {
        console.error("Xəta baş verdi:", error);
        weatherTable.innerHTML = `<tr><td colspan="12">Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.</td></tr>`;
        if (hourlyWeather) hourlyWeather.style.display = 'none';
    }
};
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            temperatur(null, lat, lon);
        },
        error => {
            console.warn('Lokasiya alınmadı:', error.message);
        }
    );
} else {
    console.warn("Brauzer lokasiyanı dəstəkləmir.");
}

weather_input.onkeydown = (e) => {
    if (e.key === 'Enter') {
        const city = weather_input.value.trim();
        temperatur(city);
    }
};
