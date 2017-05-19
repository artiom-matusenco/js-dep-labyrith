export default class LocalStorageHelper {
  static addCollectonItem(keyName, keyValue) {
    const itemCollection = this.getCollectionItem(keyName);
    if (!itemCollection) {
      this.setCollection(keyName, [keyValue]);
      return;
    }

    if (!itemCollection || !Array.isArray(itemCollection)) {
      throw new Error(`Item ${keyName} does not exist or is not an array.`);
    }

    itemCollection.push(keyValue);
    this.setCollection(keyName, itemCollection);
  }

  static deleteItem(keyName, keyValue) {
    const itemCollection = this.getCollectionItem(keyName);
    if (!itemCollection || !Array.isArray(itemCollection)) {
      throw new Error(`Item ${keyName} doe not exist or is not an array.`);
    }

    const keyValueIndex = itemCollection.indexOf(keyValue);
    if (keyValueIndex === -1) {
      throw new Error(`Delete error: Item does not exist in the collection.`)
    }

    itemCollection.splice(keyValueIndex, 1);
    this.setCollection(keyName, itemCollection);
  }

  static setCollection(keyName, keyValue) {
    localStorage.setItem(keyName, JSON.stringify(keyValue))
  }

  static getCollectionItem(keyName) {
    const collectionItem = localStorage.getItem(keyName);
    return (collectionItem && JSON.parse(collectionItem)) || [];
  }
}
