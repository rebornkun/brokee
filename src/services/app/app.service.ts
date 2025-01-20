import {
  CollectionReference,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  OrderByDirection,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import {
  DefaultResponse,
  RequestMessage,
} from "../../types/default-response.dto";
import { TPagination, TParams } from "../../types/types";

export const cloudinaryUpload = async (formData: FormData | undefined) => {
  const response = await fetch(
    import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_API!,
    {
      method: "POST",
      body: formData,
    }
  );
  return response;
};

export const generateTransactionId = (startString: string) => {
  return startString + new Date().getTime();
};

export const CreateDefaultResponse = (
  type: RequestMessage,
  message: string,
  payload: any,
  pagination?: TPagination
): DefaultResponse => {
  return {
    data: {
      alert: {
        type: type,
        message: message,
      },
      payload: payload,
      pagination,
    },
  };
};

export const PaginateData = async (
  id: string | null,
  params: TParams,
  docRef: CollectionReference<DocumentData, DocumentData>
): Promise<{ data: any; paginationData: TPagination }> => {
  let q;
  let aq;
  let sort = params.sort
    ? orderBy(
        params.sort.field as string,
        params.sort.order?.toLocaleLowerCase() as OrderByDirection
      )
    : orderBy("createdAt");

  let filter = params.filter
    ? where(params.filter.field as string, "==", params.filter.value as string)
    : null;

  let currentPage = params.pagination?.page as number;
  let take = params.pagination?.take as number;
  let pagination = currentPage === 1 ? 0 : (currentPage - 1) * take;

  //get current paginated data
  if (currentPage === 1) {
    if (filter && id) {
      q = query(
        docRef,
        where("userId", "==", `${id}`),
        filter,
        sort,
        limit(take)
      );
    } else if (filter && !id) {
      q = query(docRef, filter, sort, limit(take));
    } else if (!filter && !id) {
      q = query(docRef, sort, limit(take));
    } else {
      q = query(docRef, where("userId", "==", `${id}`), sort, limit(take));
    }
  } else {
    if (filter) {
      q = query(
        docRef,
        where("userId", "==", `${id}`),
        filter,
        sort,
        startAfter(params.lastVisible),
        limit(take)
      );
    } else if (filter && !id) {
      q = query(
        docRef,
        filter,
        sort,
        startAfter(params.lastVisible),
        limit(take)
      );
    } else if (!filter && !id) {
      q = query(docRef, sort, startAfter(params.lastVisible), limit(take));
    } else {
      q = query(
        docRef,
        where("userId", "==", `${id}`),
        orderBy("userId"),
        sort,
        startAfter(params.lastVisible),
        limit(take)
      );
    }
  }

  //get all paginated data
  if (currentPage === 1) {
    if (filter) {
      aq = query(docRef, where("userId", "==", `${id}`), filter, sort);
    } else if (filter && !id) {
      aq = query(docRef, filter, sort);
    } else if (!filter && !id) {
      aq = query(docRef, sort);
    } else {
      aq = query(docRef, where("userId", "==", `${id}`), sort);
    }
  } else {
    if (filter) {
      aq = query(docRef, where("userId", "==", `${id}`), filter, sort);
    } else if (filter && !id) {
      aq = query(docRef, filter, sort);
    } else if (!filter && !id) {
      aq = query(docRef, sort);
    } else {
      aq = query(
        docRef,
        where("userId", "==", `${id}`),
        orderBy("userId"),
        sort
      );
    }
  }

  const gottenDocs = await getDocs(q);
  const gottenDocsWithoutTake = await getDocs(aq);
  const nextLastVisible = gottenDocs.docs[gottenDocs.docs.length - 1];

  const data: any[] = [];
  const dataWithoutTake: any[] = [];

  gottenDocs.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  gottenDocsWithoutTake.forEach((doc) => {
    dataWithoutTake.push({ id: doc.id, ...doc.data() });
  });

  // get total items
  let tq;
  if (id) {
    tq = query(docRef, where("userId", "==", `${id}`));
  } else {
    tq = query(docRef);
  }
  const totalItemsDocs = await getDocs(tq);

  const allData: any[] = [];
  totalItemsDocs.forEach((doc) => {
    allData.push({ id: doc.id, ...doc.data() });
  });

  const paginationData = {
    currentPage,
    pageItems: data.length,
    totalItems: allData.length,
    totalPages: Math.ceil(dataWithoutTake.length / take),
    totalFilteredItems: dataWithoutTake.length,
    lastVisible: nextLastVisible,
  };

  return { data, paginationData };
};

export const PaginateDataWithArray = async (
  id: string | null,
  params: TParams,
  docRef: CollectionReference<DocumentData, DocumentData>
): Promise<{ data: any; paginationData: TPagination }> => {
  let q;
  let aq;
  let sort = params.sort
    ? orderBy(
        params.sort.field as string,
        params.sort.order?.toLocaleLowerCase() as OrderByDirection
      )
    : orderBy("createdAt");

  let filter = params.filter
    ? where(params.filter.field as string, "==", params.filter.value as string)
    : null;

  let currentPage = params.pagination?.page as number;
  let take = params.pagination?.take as number;
  let pagination = currentPage === 1 ? 0 : (currentPage - 1) * take;

  //get current paginated data
  if (currentPage === 1) {
    if (filter && id) {
      q = query(
        docRef,
        where("usersId", "array-contains", `${id}`),
        filter,
        sort,
        limit(take)
      );
    } else if (filter && !id) {
      q = query(docRef, filter, sort, limit(take));
    } else if (!filter && !id) {
      q = query(docRef, sort, limit(take));
    } else {
      q = query(
        docRef,
        where("usersId", "array-contains", `${id}`),
        sort,
        limit(take)
      );
    }
  } else {
    if (filter) {
      q = query(
        docRef,
        where("usersId", "array-contains", `${id}`),
        filter,
        sort,
        startAfter(params.lastVisible),
        limit(take)
      );
    } else if (filter && !id) {
      q = query(
        docRef,
        filter,
        sort,
        startAfter(params.lastVisible),
        limit(take)
      );
    } else if (!filter && !id) {
      q = query(docRef, sort, startAfter(params.lastVisible), limit(take));
    } else {
      q = query(
        docRef,
        where("usersId", "array-contains", `${id}`),
        orderBy("id"),
        sort,
        startAfter(params.lastVisible),
        limit(take)
      );
    }
  }

  //get all paginated data
  if (currentPage === 1) {
    if (filter) {
      aq = query(
        docRef,
        where("usersId", "array-contains", `${id}`),
        filter,
        sort
      );
    } else if (filter && !id) {
      aq = query(docRef, filter, sort);
    } else if (!filter && !id) {
      aq = query(docRef, sort);
    } else {
      aq = query(docRef, where("usersId", "array-contains", `${id}`), sort);
    }
  } else {
    if (filter) {
      aq = query(
        docRef,
        where("usersId", "array-contains", `${id}`),
        filter,
        sort
      );
    } else if (filter && !id) {
      aq = query(docRef, filter, sort);
    } else if (!filter && !id) {
      aq = query(docRef, sort);
    } else {
      aq = query(
        docRef,
        where("usersId", "array-contains", `${id}`),
        orderBy("id"),
        sort
      );
    }
  }

  const gottenDocs = await getDocs(q);
  const gottenDocsWithoutTake = await getDocs(aq);
  const nextLastVisible = gottenDocs.docs[gottenDocs.docs.length - 1];

  const data: any[] = [];
  const dataWithoutTake: any[] = [];

  gottenDocs.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  gottenDocsWithoutTake.forEach((doc) => {
    dataWithoutTake.push({ id: doc.id, ...doc.data() });
  });

  // get total items
  let tq;
  if (id) {
    tq = query(docRef, where("usersId", "array-contains", `${id}`));
  } else {
    tq = query(docRef);
  }
  const totalItemsDocs = await getDocs(tq);

  const allData: any[] = [];
  totalItemsDocs.forEach((doc) => {
    allData.push({ id: doc.id, ...doc.data() });
  });

  const paginationData = {
    currentPage,
    pageItems: data.length,
    totalItems: allData.length,
    totalPages: Math.ceil(dataWithoutTake.length / take),
    totalFilteredItems: dataWithoutTake.length,
    lastVisible: nextLastVisible,
  };

  return { data, paginationData };
};
