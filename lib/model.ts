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

  static findById<R extends Record = Record>(
    id: string,
    callback: (record: R) => void
  ) {
    this.collection.doc(id).onSnapshot((query) => {
      callback(this.fromDoc(query));
    });
  }

  static all<R extends Record = Record>(): Promise<R[]> {
    return new Promise((resolve, reject) => {
      this.collection.onSnapshot((query) => {
        const records = query.docs.map(this.fromDoc);

        // TODO: Handle rejection

        resolve(records);
      });
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
