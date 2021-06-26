
from rest_framework.serializers import PrimaryKeyRelatedField
from collections import OrderedDict


class PresentablePrimaryKeyRelatedField(PrimaryKeyRelatedField):
    """
    Override PrimaryKeyRelatedField to represent serializer data instead of a pk field of the object.
    """

    def use_pk_only_optimization(self):
        return False

    def __init__(self, **kwargs):
        self.presentation_serializer = kwargs.pop(
            'presentation_serializer', None)
        assert self.presentation_serializer is not None, (
            'PresentablePrimaryKeyRelatedField must provide a `presentation_serializer` argument'
        )
        super(PresentablePrimaryKeyRelatedField, self).__init__(**kwargs)

    def get_choices(self, cutoff=None):
        queryset = self.get_queryset()
        if queryset is None:
            # Ensure that field.choices returns something sensible
            # even when accessed with a read-only field.
            return {}

        if cutoff is not None:
            queryset = queryset[:cutoff]

        return OrderedDict([(item.pk, self.display_value(item)) for item in queryset])

    def to_representation(self, data):
        return self.presentation_serializer(data, context=self.context).data
