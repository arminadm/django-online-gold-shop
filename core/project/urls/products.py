from django.urls import path
from project.views import (
    BlogTemplateView,
    CollectionPageTemplateView,
    ContactTemplateView,
    CustomizeTemplateView,
    GalleryTemplateView,
    ItemBlogTemplateView,
    NewStyleTemplateView,
    PresentTemplateView,
    StoryTemplateView
)

app_name = 'products'

urlpatterns = [
    path('blog/', BlogTemplateView.as_view(), name='blog'), # index
    path('collection/', CollectionPageTemplateView.as_view(), name='collection'), # vitrine
    path('contact/', ContactTemplateView.as_view(), name='contact'), # tamas ba ma
    path('customize/', CustomizeTemplateView.as_view(), name='customize'), # shakhsi sazi
    path('gallery/', GalleryTemplateView.as_view(), name='gallery'), # gallery tala
    path('item-blog/', ItemBlogTemplateView.as_view(), name='item-blog'), # blog
    path('newstyle/', NewStyleTemplateView.as_view(), name='newstyle'), # ???
    path('present/', PresentTemplateView.as_view(), name='present'), # gift card
    path('story/', StoryTemplateView.as_view(), name='story'), # dastane ma
]