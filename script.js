$(document).ready(function() {
    console.log('LUMINA static site loaded');

    // jQuery: Smooth scroll for internal links
    $('a[href^="#"]').on('click', function(e) {
        const href = $(this).attr('href');
        if (href !== '#') {
            e.preventDefault();
            const target = $(href);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800);
            }
        }
    });

    // Handle course card hover with jQuery
    $('.course-card').hover(
        function() { $(this).css('border-color', '#4f46e5'); },
        function() { $(this).css('border-color', '#e2e8f0'); }
    );

    // Courses Slider Navigation
    const slider = $('#mainSlider');
    const scrollAmount = 350;

    $('#slideNext').on('click', function() {
        slider.animate({
            scrollLeft: slider.scrollLeft() + scrollAmount
        }, 400);
    });

    $('#slidePrev').on('click', function() {
        slider.animate({
            scrollLeft: slider.scrollLeft() - scrollAmount
        }, 400);
    });

    // Testimonials Slider Navigation
    const testimonialSlider = $('#testimonialSlider');
    const testScrollAmount = 400;

    $('#testNext').on('click', function() {
        testimonialSlider.animate({
            scrollLeft: testimonialSlider.scrollLeft() + testScrollAmount
        }, 400);
    });

    $('#testPrev').on('click', function() {
        testimonialSlider.animate({
            scrollLeft: testimonialSlider.scrollLeft() - testScrollAmount
        }, 400);
    });

    // Courses Page Logic
    const courses = [
        { id: 1, title: 'Advanced Design Systems with Figma', author: 'Sarah Jenkins', category: 'Design', price: 299, level: 'Advanced', image: 'https://picsum.photos/seed/design1/400/250', rating: 4.8, duration: '12h 45m' },
        { id: 2, title: 'Enterprise React: Scaling Microfrontends', author: 'Maya Chen', category: 'Development', price: 349, level: 'Intermediate', image: 'https://picsum.photos/seed/dev1/400/250', rating: 4.9, duration: '18h 20m' },
        { id: 3, title: 'MLOps: Production Machine Learning', author: 'Dr. Alex Aris', category: 'Data Science', price: 499, level: 'Advanced', image: 'https://picsum.photos/seed/ds1/400/250', rating: 4.7, duration: '15h 10m' },
        { id: 4, title: 'Fullstack Systems Architecture', author: 'Mark Voland', category: 'Development', price: 399, level: 'Advanced', image: 'https://picsum.photos/seed/arch1/400/250', rating: 4.8, duration: '22h 30m' },
        { id: 5, title: 'Strategic Business Analytics', author: 'James Wilson', category: 'Business', price: 199, level: 'Intermediate', image: 'https://picsum.photos/seed/biz1/400/250', rating: 4.5, duration: '10h 15m' },
        { id: 6, title: 'Creative Coding & Generative Art', author: 'Elena Rose', category: 'Design', price: 89, level: 'Beginner', image: 'https://picsum.photos/seed/art1/400/250', rating: 4.6, duration: '8h 50m' },
        { id: 7, title: 'Python for High-Frequency Trading', author: 'Dr. Alex Aris', category: 'Data Science', price: 599, level: 'Advanced', image: 'https://picsum.photos/seed/trading1/400/250', rating: 4.9, duration: '25h 00m' },
        { id: 8, title: 'Product Leadership: The First 90 Days', author: 'Sarah Jenkins', category: 'Business', price: 249, level: 'Beginner', image: 'https://picsum.photos/seed/lead1/400/250', rating: 4.4, duration: '9h 30m' }
    ];

    function renderCourses(filteredCourses) {
        const grid = $('#courseGrid');
        if (!grid.length) return;
        
        grid.empty();
        $('#courseCount').text(`Showing ${filteredCourses.length} Courses`);

        if (filteredCourses.length === 0) {
            grid.append(`
                <div class="col-12 no-results text-center py-5">
                    <div class="logo-box mx-auto mb-3" style="width: 48px; height: 48px; opacity: 0.1;"></div>
                    <h5 class="text-dark">No matches found</h5>
                    <p class="text-muted small">Try adjusting your filters or search keywords.</p>
                </div>
            `);
            return;
        }

        filteredCourses.forEach(course => {
            const stars = getStarRating(course.rating);
            grid.append(`
                <div class="col-md-6 col-lg-4 course-item" data-category="${course.category}" data-price="${course.price}" data-level="${course.level}">
                    <div class="course-card h-100">
                        <div class="course-badge">${course.category}</div>
                        <img src="${course.image}" class="course-img" alt="${course.title}" referrerPolicy="no-referrer">
                        <div class="course-body">
                            <h5 class="course-title">${course.title}</h5>
                            <div class="course-meta-row mb-3">
                                <div class="rating-box">
                                    <span class="stars-ui">${stars}</span>
                                    <span class="rating-num">${course.rating}</span>
                                </div>
                                <div class="duration-box">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-1"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    <span>${course.duration}</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="price-tag">RM ${course.price}</span>
                                <a href="course-detail.html" class="btn btn-sm btn-outline-primary px-3" style="font-size: 11px;">Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    function getStarRating(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars += '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#ffc107" stroke="#ffc107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
            } else if (i - 0.5 <= rating) {
                stars += '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffc107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-1"><defs><linearGradient id="half"><stop offset="50%" stop-color="#ffc107"/><stop offset="50%" stop-color="transparent" stop-opacity="1"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#half)"/></svg>';
            } else {
                stars += '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
            }
        }
        return stars;
    }

    function applyFilters() {
        const selectedCats = $('.filter-category:checked').map(function() { return $(this).val(); }).get();
        const selectedLvls = $('.filter-level:checked').map(function() { return $(this).val(); }).get();
        const priceRange = $('.filter-price:checked').val();
        const searchQuery = $('#courseSearch').val().toLowerCase().trim();

        let filtered = courses.filter(course => {
            const catMatch = selectedCats.length === 0 || selectedCats.includes(course.category);
            const lvlMatch = selectedLvls.length === 0 || selectedLvls.includes(course.level);
            
            let priceMatch = true;
            if (priceRange === '0-100') priceMatch = course.price < 100;
            else if (priceRange === '100-300') priceMatch = course.price >= 100 && course.price <= 300;
            else if (priceRange === '300-above') priceMatch = course.price > 300;

            const searchMatch = !searchQuery || 
                course.title.toLowerCase().includes(searchQuery) ||
                course.category.toLowerCase().includes(searchQuery) ||
                course.author.toLowerCase().includes(searchQuery);

            return catMatch && lvlMatch && priceMatch && searchMatch;
        });

        renderCourses(filtered);
    }

    $('.filter-category, .filter-level, .filter-price').on('change', applyFilters);
    
    $('#courseSearch').on('input', function() {
        const hasValue = $(this).val().length > 0;
        $('#clearSearch').toggle(hasValue);
        applyFilters();
    });

    $('#clearSearch').on('click', function() {
        $('#courseSearch').val('').trigger('input');
        $(this).hide();
    });

    $('#clearFilters').on('click', function() {
        $('.filter-category, .filter-level').prop('checked', false);
        $('#pAll').prop('checked', true);
        $('#courseSearch').val('').trigger('input');
        applyFilters();
    });

    // Initial load
    if ($('#courseGrid').length) {
        renderCourses(courses);
    }
});
