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

    def upload(self, file, outdir, password=None):
        path = os.path.join(os.getcwd(), outdir, file.name.replace(" ", "_"))
        if not os.path.exists(os.path.join(os.getcwd(), outdir)):
            print('folder created')
            os.makedirs(os.path.join(os.getcwd(), outdir))
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

    def encode(self, path, password):
        return AESCrypt().encrypt(path, password)

    def decode(self, path, password, delet=False):
        AESCrypt().decrypt(path, password, remove_src=delet)
        return os.path.splitext(path)[0]
