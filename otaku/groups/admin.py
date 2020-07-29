from django.contrib import admin

# Register your models here.
from . import models

# Register your models here.


class GroupMemberInline(admin.TabularInline):
    model = models.GroupMember

admin.site.register(models.Group)