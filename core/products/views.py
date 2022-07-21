from django.shortcuts import render
from django.views.generic import View, TemplateView

# Create your views here.
class BlogTemplateView(TemplateView):
    template_name = 'temp/blog.html'

class CollectionPageTemplateView(TemplateView):
    template_name = 'temp/collection-page.html'

class ContactTemplateView(TemplateView):
    template_name = 'temp/contact.html'

class CustomizeTemplateView(TemplateView):
    template_name = 'temp/customize.html'

class GalleryTemplateView(TemplateView):
    template_name = 'temp/gallery.html'

class ItemBlogTemplateView(TemplateView):
    template_name = 'temp/item-blog.html'

class NewStyleTemplateView(TemplateView):
    template_name = 'temp/newstyle.html'

class PresentTemplateView(TemplateView):
    template_name = 'temp/present.html'

class StoryTemplateView(TemplateView):
    template_name = 'temp/story.html'