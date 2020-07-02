import { firestore } from 'firebase/app';
import { useState, useEffect } from 'react';

export type Doc<Data = firestore.DocumentData> = firestore.DocumentSnapshot<
  Data
>;

abstract class Collection<Data extends firestore.DocumentData> {
  static get collectionName(): string {
    throw new Error('Model collectionName was not defined');
  }

  static get collection() {
    return firestore().collection(this.collectionName);
  }

  static findById<R extends Record = Record>(id: string, cb: Callback<R>) {
    this.collection.doc(id).onSnapshot((doc) => {
      if (doc.exists) {
        // @ts-ignore
        cb(new this(doc));
      }
    });
  }

  static all<R extends Record = Record, Data = any>(cb: Callback<R[]>): void {
    this.collection.onSnapshot((query: firestore.QuerySnapshot<Data>) => {
      const records = query.docs.map((doc) => {
        // @ts-ignore
        return new this(doc);
      });

      cb(records);
    });
  }

  protected get collection(): firestore.CollectionReference<Data> {
    // @ts-ignore
    return this.constructor.collection;
  }
}

type Callback<Response> = (response: Response) => void;

export abstract class Record<Data = firestore.DocumentData> extends Collection<
  Data
> {
  protected doc: Doc<Data>;
  protected data: Data;

  constructor(data: Data | Doc<Data>) {
    super();
    if (data instanceof firestore.DocumentSnapshot) {
      this.doc = data;
      this.data = data.data();
    } else {
      this.data = data;
    }
  }

  get id() {
    if (this.doc) return this.doc.id;
  }

  async save() {
    if (!this.doc) {
      const query = await this.collection.add(this.data);
      const doc = await query.get();
      this.doc = doc;
      this.data = doc.data();
      return this;
    }
  }

  delete() {
    this.collection.doc(this.id).delete();
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
