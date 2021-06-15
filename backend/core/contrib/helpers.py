from pathlib import Path
from django.core.files.storage import FileSystemStorage
from core.contrib.encryption import AESCrypt
import os


class FileSystem:
    file_name_index = 0

    def normalize_file_name(self, outdir, filename):
        path = Path(Path.cwd(), outdir, filename)
        if not path.exists():
            self.file_name_index = 0
            return filename
        self.file_name_index = self.file_name_index + 1
        tmp = "{}({}){}".format(path.stem, self.file_name_index, path.suffix)
        return self.normalize_file_name(outdir, tmp)

    def save_file(self, file, outdir, password=None):
        path = os.path.join(os.getcwd(), outdir, file.name)
        if not os.path.exists(path):
            os.makedirs(path)
        fs = FileSystemStorage()
        abs_name = fs.save(path, file)
        data = {}
        data['size'] = round(fs.size(abs_name) * 0.000977)
        if password:
            abs_name = AESCrypt().encrypt(abs_name, password)
        splited_path = abs_name.split('/')
        data['name'] = splited_path[-1]
        # data['path'] = abs_name
        data['url'] = "/".join(splited_path[splited_path.index('media'):])
        return data
