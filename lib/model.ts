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

  static async create<Data = any>(data: Data): Promise<Record<Data>> {
    const doc = await this.collection.add(data);
    const doc_1 = await doc.get();
    return this.fromDoc(doc_1);
  }

  static findById<Data = any>(id: string): Promise<Record<Data>> {
    return new Promise((resolve, reject) => {
      this.collection.doc(id).onSnapshot((query) => {
        if (query.exists) {
          resolve(this.fromDoc<Data>(query));
        } else {
          reject();
        }
      });
    });
  }

  static all<Data = any>(): Promise<Record<Data>[]> {
    return new Promise((resolve, reject) => {
      this.collection.onSnapshot((query: firestore.QuerySnapshot<Data>) => {
        const records = query.docs.map((doc) => this.fromDoc<Data>(doc));

        // TODO: Handle rejection

        resolve(records);
      });
    });
  }

  static fromDoc<Data = any>(doc: Doc): Record<Data> {
    throw new Error('Not implemented');
  }
}

export abstract class Record<Data = firestore.DocumentData> extends Collection {
  protected doc: Doc<Data>;

  get id() {
    if (this.doc) return this.doc.id;
  }

  delete() {
    // @ts-ignore
    this.constructor.collection.doc(this.id).delete();
  }
}

export function useRecord(Model: typeof Record, id?: string) {
  const [record, setRecord] = useState({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!id) return;
    Model.findById(id).then((data) => {
      setRecord({
        loading: false,
        data,
        error: null,
      });
    });
  }, [id]);

  return record;
}
