import { firestore } from 'firebase/app';
import { useState, useEffect } from 'react';

export type Doc<Data = firestore.DocumentData> = firestore.DocumentSnapshot<
  Data
>;

abstract class Collection {
  static get collectionName(): string {
    throw new Error('Model collectionName was not defined');
  }
  static get collection() {
    return firestore().collection(this.collectionName);
  }
  static create(data: any) {
    return this.collection.add(data);
  }
  static findById(id: string, callback: (record: Record) => void) {
    this.collection.doc(id).onSnapshot((query) => {
      callback(this.fromDoc(query));
    });
  }
  static all(callback: (encounters: Record[]) => void) {
    this.collection.onSnapshot((query) => {
      const encounters = query.docs.map(this.fromDoc);

      callback(encounters);
    });
  }
  static fromDoc(doc: Doc) {
    return null;
  }
}

export abstract class Record extends Collection {
  protected doc: Doc;

  get id() {
    if (this.doc) return this.doc.id;
  }

  delete() {
    // @ts-ignore
    this.constructor.collection.doc(this.id).delete();
  }
}

export function useRecord(Model: any, id?: string) {
  const [record, setRecord] = useState({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!id) return;
    Model.findById(id, (data) => {
      setRecord({
        loading: false,
        data,
        error: null,
      });
    });
  }, [id]);

  return record;
}
