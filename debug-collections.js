import { getCollection } from 'astro:content';

async function debug() {
    const reviews = await getCollection('reviews');
    console.log('Reviews collection:', reviews.map(r => ({ id: r.id, slug: r.slug })));
    
    const enReviews = reviews.filter(r => r.id.startsWith('en/'));
    console.log('EN reviews:', enReviews.map(r => r.id));
    
    enReviews.forEach(review => {
        const slug = review.id.replace(/^en\//, '');
        console.log(`Review ${review.id} -> slug: ${slug}, params: { slug: ['${slug}'] }`);
    });
}

debug().catch(console.error);