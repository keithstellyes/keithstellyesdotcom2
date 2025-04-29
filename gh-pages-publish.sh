#!/usr/bin/env bash
git checkout main && \
    git branch -d gh-pages && \
    git checkout -b gh-pages && \
    git push -f --set-upstream origin gh-pages
git checkout main
