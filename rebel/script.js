// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Auth Check - consistent with login page
    const loggedInUser = localStorage.getItem('loggedInUser');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Pages that don't require authentication
    const publicPages = ['login.html', 'signup.html', 'forgot-password.html', 'index.html'];
    
    if (!loggedInUser && !publicPages.includes(currentPage)) {
        window.location.href = 'login.html';
        return;
    }
    
    // If logged in but on login page, redirect to dashboard
    if (loggedInUser && currentPage === 'login.html') {
        window.location.href = 'dashboard.html';
        return;
    }

    // Form Handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form processing
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            setTimeout(() => {
                if (form.id === 'loginForm' || form.id === 'signupForm') {
                    localStorage.setItem('loggedIn', 'true');
                    window.location.href = 'dashboard.html';
                } else if (form.id === 'forgotForm') {
                    alert('Password reset link has been sent to your email');
                    window.location.href = 'login.html';
                } else {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'alert success animate-in';
                    successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Action completed successfully';
                    form.parentNode.insertBefore(successMsg, form.nextSibling);
                    
                    setTimeout(() => successMsg.remove(), 3000);
                }
            }, 1500);
        });
    });

    // Modal Handling
    const modalTriggers = document.querySelectorAll('[data-modal]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Close modal when clicking on backdrop
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeModal();
                    }
                });
            }
        });
    });

    // Close modals
    const closeButtons = document.querySelectorAll('.modal-close, .modal-cancel');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Close modal function
    function closeModal() {
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
        document.body.style.overflow = '';
    }

    // Toast notifications
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type} animate-in`;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i> ${message}`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Close toast when clicked
    document.addEventListener('click', function(e) {
        if (e.target.closest('.toast')) {
            const toast = e.target.closest('.toast');
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }
    });

    // Logout functionality
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('loggedIn');
            window.location.href = 'login.html';
        });
    });
});