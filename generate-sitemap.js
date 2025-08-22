import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

(async () => {
    const links = [
        { url: '/', changefreq: 'daily', priority: 1.0 },
        { url: '/books', changefreq: 'weekly', priority: 0.8 },
        { url: '/solve-doubt', changefreq: 'monthly', priority: 0.7 },
        { url: '/tools', changefreq: 'monthly', priority: 0.7 },
        { url: '/leaderboard', changefreq: 'monthly', priority: 0.7 },
        { url: '/document-search', changefreq: 'monthly', priority: 0.7 }
    ];

    const stream = new SitemapStream({ hostname: 'https://yourwebsite.com' });
    const writeStream = createWriteStream('./public/sitemap.xml');

    streamToPromise(stream).then(() => console.log('Sitemap generated!'));
    stream.pipe(writeStream);

    links.forEach(link => stream.write(link));
    stream.end();
})();
