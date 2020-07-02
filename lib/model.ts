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

  static findById<Data = any>(id: string, cb: Callback<Record<Data>>) {
    this.collection.doc(id).onSnapshot((query) => {
      if (query.exists) {
        cb(this.fromDoc<Data>(query));
      }
    });
  }

  static all<Data = any>(cb: Callback<Record<Data>[]>): void {
    this.collection.onSnapshot((query: firestore.QuerySnapshot<Data>) => {
      const records = query.docs.map((doc) => this.fromDoc<Data>(doc));

      cb(records);
    });
  }

  static fromDoc<Data = any>(doc: Doc): Record<Data> {
    throw new Error('Not implemented');
  }
}

type Callback<Response> = (response: Response) => void;

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
