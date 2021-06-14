import pyAesCrypt
import os


class AESCrypt:
  def __init__(self, bufferSize=512 * 1024):
      self.bufferSize = bufferSize

  def encrypt(self, path, password, remove_src=True):
    try:
      if os.path.isdir(path):
        for file in os.listdir(path):
          self.encrypt(os.path.join(path,file), password)
      else:
        pyAesCrypt.encryptFile(str(path), f"{path}.ckam", str(password),self.bufferSize)
        if remove_src:
          os.remove(path)
    except ValueError as e:
      print(e)


  def decrypt(self, path, password, remove_src=True):
    try:
      if os.path.isdir(path):
        for file in os.listdir(path):
          self.decrypt(os.path.join(path,file), password)
      else:
       pyAesCrypt.decryptFile(str(path), os.path.splitext(path)[0], str(password), self.bufferSize)
       if remove_src:
          os.remove(path)
    except ValueError as e:
      print(e)