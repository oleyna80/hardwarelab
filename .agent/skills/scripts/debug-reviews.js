
import { getCollection } from 'astro:content';

async function checkReviews() {
    const reviews = await getCollection('reviews');
    console.log('Total reviews:', reviews.length);
    reviews.slice(0, 5).forEach(r => {
        console.log(`ID: ${r.id}, Slug: ${r.slug}`);
    });
}

checkReviews();
