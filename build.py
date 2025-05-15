#!/usr/bin/env python3
from jinja2 import Environment, FileSystemLoader
import json, os, subprocess

env = Environment(loader = FileSystemLoader('src'))

SVGS = {}
for fn in os.listdir('svg'):
    base = fn[:fn.index('.svg')]
    SVGS[base] = open('svg/' + fn, 'r').read()
GLOBALS = f'window.SVG = {json.dumps(SVGS)}'

template = env.get_template('index.jinja')

html = template.render(GLOBALS=GLOBALS)

try:
    os.mkdir('build')
except FileExistsError:
    pass

pages_json_bytes = subprocess.run(['node', 'src/index.js'],
                               capture_output=True).stdout
pages = json.loads(pages_json_bytes.decode('utf-8'))

page_names = [page['path'].lstrip('/') for page in pages.values()]
page_names = [p for p in page_names if p != ''] + ['index.html']
print('paths to generate:', page_names)
for fn in page_names:
    with open('build/' + fn, 'w') as f:
        f.write(html)
