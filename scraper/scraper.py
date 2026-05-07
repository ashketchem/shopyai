import json
import requests
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime

class ProductScraper:
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")
        
        try:
            self.driver = webdriver.Chrome(options=chrome_options)
        except Exception:
            self.driver = webdriver.Chrome()
        
        self.api_url = "http://backend:8080/api/products"
        self.platforms_config = [
            {
                "platform": "Amazon",
                "search_url": "https://www.amazon.in/s?k={}",
                "item_container": "div[data-component-type='s-search-result']",
                "name_css": "h2 a span",
                "price_css": ".a-price-whole",
                "link_css": "h2 a",
                "all_reviews_btn": "a[data-hook='see-all-reviews-link-foot']",
                "review_text_css": "span[data-hook='review-body']",
                "filter_5star_url": "&filterByStar=five_star",
                "filter_3star_url": "&filterByStar=three_star",
                "filter_1star_url": "&filterByStar=one_star"
            },
            {
                "platform": "Flipkart",
                "search_url": "https://www.flipkart.com/search?q={}",
                "item_container": "div._757964",
                "name_css": "div.KzDlHZ",
                "price_css": "div.Nx9bqj",
                "link_css": "a.CGtC98",
                "all_reviews_btn": "div.col-12-12 > a",
                "review_text_css": "div.Zmy9jY",
                "filter_5star_url": "&rating=5",
                "filter_3star_url": "&rating=3",
                "filter_1star_url": "&rating=1"
            },
            {
                "platform": "BestBuy",
                "search_url": "https://www.bestbuy.com/site/searchpage.jsp?st={}",
                "item_container": "div.sku-item",
                "name_css": "h4.sku-title",
                "price_css": "div.priceView",
                "link_css": "a.sku-title",
                "all_reviews_btn": "a[href*='reviews']",
                "review_text_css": "p.review-content",
                "filter_5star_url": "?sort=bestmatch&ratingFilter=5onlyups",
                "filter_3star_url": "?sort=bestmatch&ratingFilter=3onlyups",
                "filter_1star_url": "?sort=bestmatch&ratingFilter=1onlyups"
            },
            {
                "platform": "eBay",
                "search_url": "https://www.ebay.com/sch/i.html?_nkw={}",
                "item_container": "div.s-item",
                "name_css": "h2.s-headline",
                "price_css": "span.s-item__price",
                "link_css": "a.s-item__link",
                "all_reviews_btn": "a[aria-label*='reviews']",
                "review_text_css": "p.ebay-review-section__content",
                "filter_5star_url": "&_sacat=1&rt=nc&_udlo=&_udhi=&_samilow=&_samihi=&_sadis=15&LH_ItemCondition=3000&_fpsc=1",
                "filter_3star_url": "&_sacat=1&rt=nc&_udlo=&_udhi=&_samilow=&_samihi=&_sadis=15&LH_ItemCondition=3000",
                "filter_1star_url": "&_sacat=1&rt=nc&_udlo=&_udhi=&_samilow=&_samihi=&_sadis=15&LH_ItemCondition=1000"
            },
            {
                "platform": "Walmart",
                "search_url": "https://www.walmart.com/search?q={}",
                "item_container": "div[data-testid='product-grid-container']",
                "name_css": "span.rjs_sku__product-title",
                "price_css": "span[data-testid='product-price']",
                "link_css": "a.rjs_sku__link",
                "all_reviews_btn": "a[href*='reviews']",
                "review_text_css": "p[data-testid='review-text']",
                "filter_5star_url": "&facet=review_rating_five",
                "filter_3star_url": "&facet=review_rating_three",
                "filter_1star_url": "&facet=review_rating_one"
            }
        ]

    def scrape_site(self, search_query, config):
        try:
            search_url = config['search_url'].format(search_query.replace(' ', '+'))
            self.driver.get(search_url)
            
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, config['item_container']))
            )
            
            first_item = self.driver.find_element(By.CSS_SELECTOR, config['item_container'])
            name = first_item.find_element(By.CSS_SELECTOR, config['name_css']).text
            price_text = first_item.find_element(By.CSS_SELECTOR, config['price_css']).text
            price = float(''.join(filter(str.isdigit, price_text.split('.')[0])))
            link = first_item.find_element(By.CSS_SELECTOR, config['link_css']).get_attribute('href')

            self.driver.get(link)
            time.sleep(2)
            reviews = self.collect_categorized_reviews(config)

            return {
                "platformName": config['platform'],
                "price": price,
                "productUrl": link,
                "bestReviews": reviews['best'],
                "avgReviews": reviews['avg'],
                "badReviews": reviews['bad']
            }
        except Exception as e:
            print(f"Error scraping {config['platform']}: {str(e)}")
            return None

    def collect_categorized_reviews(self, config):
        reviews_data = {"best": [], "avg": [], "bad": []}
        try:
            time.sleep(1)
            filters = [
                ("best", config['filter_5star_url']),
                ("avg", config['filter_3star_url']),
                ("bad", config['filter_1star_url'])
            ]

            for label, filter_url in filters:
                try:
                    self.driver.get(self.driver.current_url + filter_url)
                    time.sleep(1)
                    elements = self.driver.find_elements(By.CSS_SELECTOR, config['review_text_css'])
                    reviews_data[label] = [el.text[:200] for el in elements[:4] if el.text]
                except Exception:
                    pass
        except Exception:
            pass
        
        return reviews_data

    def run(self, product_name):
        try:
            response = requests.get(f"{self.api_url}/cached/{product_name.lower()}", timeout=5)
            if response.status_code == 200:
                return response.json()
        except Exception:
            pass

        final_results = []
        
        for config in self.platforms_config:
            result = self.scrape_site(product_name, config)
            if result:
                final_results.append(result)
            time.sleep(1)

        if final_results:
            try:
                payload = {
                    "searchQuery": product_name.lower(),
                    "productName": product_name,
                    "platforms": final_results
                }
                requests.post(self.api_url, json=payload, timeout=10)
            except Exception as e:
                print(f"Error saving to API: {str(e)}")
        
        return final_results

    def close(self):
        if self.driver:
            self.driver.quit()

if __name__ == "__main__":
    scraper = ProductScraper()
    try:
        results = scraper.run("iPhone 15")
        print(json.dumps(results, indent=2))
    finally:
        scraper.close()
