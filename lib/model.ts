import { firestore } from 'firebase/app';
import { useState, useEffect } from 'react';

export abstract class Model {
  static get collectionName(): string {
    throw new Error('Model collectionName was not defined');
  }
  static get collection() {
    return firestore().collection(this.collectionName);
  }
  static create(data: any) {
    return this.collection.add(data);
  }
  static findById(id: string, callback: (encounters: Model) => void) {
    this.collection.doc(id).onSnapshot((query) => {
      callback(this.fromQuery(query));
    });
  }
  static all(callback: (encounters: Model[]) => void) {
    this.collection.onSnapshot((query) => {
      const encounters = query.docs.map(this.fromQuery);

      callback(encounters);
    });
  }
  static fromQuery(data: any) {
    return null;
  }

  id?: string;

  delete() {
    // @ts-ignore
    this.constructor.collection // @ts-ignore
      .doc(this.id)
      .delete();
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
