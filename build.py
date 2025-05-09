#!/usr/bin/env python3
from jinja2 import Environment, FileSystemLoader
import json, os

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
for fn in ('index.html', 'plants.html', 'tech.html'):
    with open('build/' + fn, 'w') as f:
        f.write(html)
