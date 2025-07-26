import * as cheerio from 'cheerio';

export interface ScrapedScholarship {
  title: string;
  description: string;
  amount: number;
  deadline: string;
  organization: string;
  applicationUrl: string;
  sourceUrl: string;
  requirements: string[];
  eligibility: string[];
  categories: string[];
}

export class ScholarshipScraper {
  private readonly userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

  async scrapeScholarships(sources: string[] = []): Promise<ScrapedScholarship[]> {
    const defaultSources = [
      'https://www.scholarships.com',
      'https://www.fastweb.com',
      'https://www.college-scholarships.com'
    ];

    const sourcesToScrape = sources.length > 0 ? sources : defaultSources;
    const allScholarships: ScrapedScholarship[] = [];

    for (const source of sourcesToScrape) {
      try {
        console.log(`Scraping scholarships from: ${source}`);
        const scholarships = await this.scrapeSource(source);
        allScholarships.push(...scholarships);
        
        // Add delay between requests to be respectful
        await this.delay(2000);
      } catch (error) {
        console.error(`Error scraping ${source}:`, error);
        continue;
      }
    }

    return allScholarships;
  }

  private async scrapeSource(url: string): Promise<ScrapedScholarship[]> {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // This is a generic scraper - in real implementation, 
      // you'd have specific parsers for each site
      return this.parseGenericScholarshipPage($, url);

    } catch (error) {
      console.error(`Failed to scrape ${url}:`, error);
      return [];
    }
  }

  private parseGenericScholarshipPage($: cheerio.CheerioAPI, sourceUrl: string): ScrapedScholarship[] {
    const scholarships: ScrapedScholarship[] = [];

    // Generic selectors - would need to be customized per site
    const scholarshipElements = $('.scholarship-item, .scholarship-card, .award-item, [data-scholarship]');

    scholarshipElements.each((index, element) => {
      try {
        const $el = $(element);
        
        const title = this.extractText($el, 'h1, h2, h3, .title, .scholarship-title, [data-title]');
        const description = this.extractText($el, '.description, .summary, .scholarship-description, p');
        const amountText = this.extractText($el, '.amount, .award, .scholarship-amount, [data-amount]');
        const deadlineText = this.extractText($el, '.deadline, .due-date, .application-deadline, [data-deadline]');
        const organization = this.extractText($el, '.organization, .sponsor, .provider, [data-organization]');
        const applicationUrl = this.extractLink($el, 'a[href*="apply"], .apply-link, [data-apply-url]') || sourceUrl;

        if (title && description) {
          scholarships.push({
            title: title.trim(),
            description: description.trim(),
            amount: this.parseAmount(amountText),
            deadline: this.parseDeadline(deadlineText),
            organization: organization || 'Unknown Organization',
            applicationUrl,
            sourceUrl,
            requirements: this.extractRequirements($el),
            eligibility: this.extractEligibility($el),
            categories: this.extractCategories($el, title, description)
          });
        }
      } catch (error) {
        console.error('Error parsing scholarship element:', error);
      }
    });

    return scholarships;
  }

  private extractText($el: cheerio.Cheerio<cheerio.Element>, selectors: string): string {
    const selectorsArray = selectors.split(',').map(s => s.trim());
    
    for (const selector of selectorsArray) {
      const text = $el.find(selector).first().text().trim();
      if (text) return text;
    }
    
    return '';
  }

  private extractLink($el: cheerio.Cheerio<cheerio.Element>, selectors: string): string {
    const selectorsArray = selectors.split(',').map(s => s.trim());
    
    for (const selector of selectorsArray) {
      const href = $el.find(selector).first().attr('href');
      if (href) return href;
    }
    
    return '';
  }

  private parseAmount(amountText: string): number {
    if (!amountText) return 0;
    
    // Remove non-numeric characters except dots and commas
    const cleanAmount = amountText.replace(/[^\d,.]/g, '');
    const amount = parseFloat(cleanAmount.replace(/,/g, ''));
    
    return isNaN(amount) ? 0 : amount;
  }

  private parseDeadline(deadlineText: string): string {
    if (!deadlineText) return '';
    
    // Try to extract date patterns
    const datePatterns = [
      /(\d{1,2}\/\d{1,2}\/\d{4})/,  // MM/DD/YYYY
      /(\d{1,2}-\d{1,2}-\d{4})/,    // MM-DD-YYYY
      /(\w+ \d{1,2}, \d{4})/,       // Month DD, YYYY
      /(\d{4}-\d{2}-\d{2})/         // YYYY-MM-DD
    ];

    for (const pattern of datePatterns) {
      const match = deadlineText.match(pattern);
      if (match) {
        try {
          const date = new Date(match[1]);
          if (!isNaN(date.getTime())) {
            return date.toISOString();
          }
        } catch (error) {
          continue;
        }
      }
    }

    return deadlineText;
  }

  private extractRequirements($el: cheerio.Cheerio<cheerio.Element>): string[] {
    const requirements: string[] = [];
    
    // Look for requirement indicators
    const reqSelectors = [
      '.requirements li',
      '.criteria li', 
      '.eligibility li',
      '[data-requirements] li'
    ];

    reqSelectors.forEach(selector => {
      $el.find(selector).each((i, req) => {
        const text = cheerio.load(req).text().trim();
        if (text) requirements.push(text);
      });
    });

    return [...new Set(requirements)]; // Remove duplicates
  }

  private extractEligibility($el: cheerio.Cheerio<cheerio.Element>): string[] {
    const eligibility: string[] = [];
    
    const eligSelectors = [
      '.eligibility li',
      '.qualification li',
      '.criteria li'
    ];

    eligSelectors.forEach(selector => {
      $el.find(selector).each((i, eli) => {
        const text = cheerio.load(eli).text().trim();
        if (text) eligibility.push(text);
      });
    });

    return [...new Set(eligibility)];
  }

  private extractCategories($el: cheerio.Cheerio<cheerio.Element>, title: string, description: string): string[] {
    const categories: string[] = [];
    
    // Extract from tags/labels
    $el.find('.tag, .category, .label, .badge').each((i, tag) => {
      const text = cheerio.load(tag).text().trim();
      if (text) categories.push(text);
    });

    // Infer categories from title and description
    const text = (title + ' ' + description).toLowerCase();
    const categoryKeywords = {
      'STEM': ['stem', 'science', 'technology', 'engineering', 'math', 'computer'],
      'Arts': ['art', 'music', 'creative', 'design', 'theater', 'dance'],
      'Business': ['business', 'entrepreneurship', 'management', 'finance', 'economics'],
      'Healthcare': ['medical', 'nursing', 'health', 'medicine', 'healthcare'],
      'Education': ['teaching', 'education', 'educator', 'teacher'],
      'Leadership': ['leadership', 'leader', 'president', 'captain'],
      'Community Service': ['volunteer', 'community', 'service', 'nonprofit'],
      'Athletics': ['athletic', 'sports', 'team', 'player', 'fitness'],
      'Diversity': ['diversity', 'minority', 'women', 'first-generation', 'underrepresented']
    };

    Object.entries(categoryKeywords).forEach(([category, keywords]) => {
      if (keywords.some(keyword => text.includes(keyword))) {
        categories.push(category);
      }
    });

    return [...new Set(categories)];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Method to scrape a specific scholarship site with custom logic
  async scrapeScholarshipsDotCom(): Promise<ScrapedScholarship[]> {
    // Custom implementation for scholarships.com
    // This would be more specific to their HTML structure
    return this.scrapeSource('https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-type/');
  }

  async scrapeFastweb(): Promise<ScrapedScholarship[]> {
    // Custom implementation for fastweb.com
    return this.scrapeSource('https://www.fastweb.com/college-scholarships');
  }

  // Method to scrape university scholarship pages
  async scrapeUniversityScholarships(universityUrls: string[]): Promise<ScrapedScholarship[]> {
    const allScholarships: ScrapedScholarship[] = [];

    for (const url of universityUrls) {
      try {
        const scholarships = await this.scrapeSource(url);
        allScholarships.push(...scholarships);
        await this.delay(3000); // Be more respectful with university sites
      } catch (error) {
        console.error(`Error scraping university ${url}:`, error);
      }
    }

    return allScholarships;
  }
}

// Export a singleton instance
export const scholarshipScraper = new ScholarshipScraper(); 