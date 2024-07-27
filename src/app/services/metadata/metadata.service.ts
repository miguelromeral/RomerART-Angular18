import { Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  updateMetadata(
    title: string,
    description: string,
    image: string,
    url: string
  ) {
    this.title.setTitle(title);

    const tags: MetaDefinition[] = [
      { name: 'title', content: title },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ];

    tags.forEach(tag => this.meta.addTag(tag));
  }
}
