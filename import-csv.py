import csv

# File paths
html_template_path = '/Users/joe/Documents/GitHub/portfolio_v2/project_page.html'
csv_file_path = '/Users/joe/Documents/GitHub/portfolio_v2/Portfolio-pages.csv'
output_directory = '/Users/joe/Documents/GitHub/portfolio_v2/page-generated'

# Read HTML template
with open(html_template_path, 'r', encoding='utf-8') as file:
    html_template = file.read()

# Function to replace placeholders in the HTML template
def generate_html(content, lang, category, title, meta_description, style, image_alts, image_refs, image_names, text, page_name):
    html = content
    html = html.replace('*lang*', lang)
    html = html.replace('*category*', category)
    html = html.replace('*Title*', title)
    html = html.replace('*meta description*', meta_description)
    html = html.replace('*style*', style)
    
    # Ensure the lists have exactly 8 elements
    image_alts = (image_alts + [''] * 8)[:8]
    image_refs = (image_refs + [''] * 8)[:8]
    image_names = (image_names + [''] * 8)[:8]
    
    for i in range(8):
        html = html.replace(f'*image alt {i+1}*', image_alts[i])
        html = html.replace(f'*image href {i+1}*', image_refs[i])
        html = html.replace(f'*image name {i+1}*', image_names[i])
    
    html = html.replace('*Text*', text)
    html = html.replace('*page name*', page_name)
    return html

# Read CSV file
with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        # Prepare data for French page
        image_alts_fr = row['Image alts (fr)'].split('\n')
        image_refs = row['Image hrefs'].split('\n')
        image_names_fr = row['Image name (fr)'].split('\n')
        
        french_html = generate_html(
            html_template, 
            'fr', 
            row['Category (fr)'], 
            row['Title (fr)'], 
            row['Meta description text(fr)'], 
            row['Style'], 
            image_alts_fr, 
            image_refs, 
            image_names_fr, 
            row['Text (fr)'], 
            row['Page name']
        )

        # Prepare data for English page
        image_alts_en = row['Image alts (en)'].split('\n')
        image_names_en = row['Image name (en)'].split('\n')
        
        english_html = generate_html(
            html_template, 
            'en', 
            row['Category (en)'], 
            row['Title (en)'], 
            row['Meta description text(en)'], 
            row['Style'], 
            image_alts_en, 
            image_refs, 
            image_names_en, 
            row['Text (en)'], 
            row['Page name']
        )

        # Save the HTML files
        french_filename = f"{output_directory}/{row['Page name']}_fr.html"
        english_filename = f"{output_directory}/{row['Page name']}.html"
        
        with open(french_filename, 'w', encoding='utf-8') as file:
            file.write(french_html)
        
        with open(english_filename, 'w', encoding='utf-8') as file:
            file.write(english_html)

print("HTML pages generated successfully.")