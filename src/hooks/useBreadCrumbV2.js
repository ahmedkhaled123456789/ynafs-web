import { useEffect } from "react";
import { useBreadcrumbStore } from "../store/breadcrumbStore";
import axiosRequest from "../Api/axiosRequest";

// export const useBreadCrumbV2 = () => {
//   const breadcrumbPath = useSelector(
//     (state) => state.category.breadcrumbPathV2
//   );

//   return { breadcrumbPath, getPath: breadcrumbPath.length <= 1 };
// };

/**
 *
 * @returns {{
 *    path: mainParams['path'];
 *    push: mainParams['push'];
 *    setPath: resetParams['setPath'];
 *    clear: () => void;
 *}}
 */
export const useBreadCrumbV2 = () => {
  const { path, clear, setPath, push } = useBreadcrumbStore();
  useEffect(() => {
    const state = window.history.state;

    if (state?.breadcrumbPath) {
      setPath(state.breadcrumbPath);
    } else {
      resetBreadCrumbState({
        path: [],
      });
    }

    /**
     *
     * @param {PopStateEvent} event
     */
    const handlePopState = (event) => {
      const state = event.state;
      if (state?.breadcrumbPath) {
        setPath(state.breadcrumbPath); // replace Zustand breadcrumb path
      } else {
        clear(); // fallback if no path exists
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { path, push, setPath, clear };
};

/**
 * @typedef {Object} BreadcrumbItem
 * @property {string} label
 * @property {string} [_id]
 * @property {string} [to]
 */

/**
 * @typedef {Object} mainParams
 * @property {string} name
 * @property {string} urlPath
 * @property {string} to
 * @property {string} id
 * @property {() => void} push
 * @property {BreadcrumbItem[]} path
 */

/**
 * @typedef {Object} resetParams
 * @property {boolean} reset
 * @property {(path: BreadcrumbItem[]) => void} [setPath]
 * @property {BreadcrumbItem[]} path
 */

/**
 *
 * @param {mainParams & Partial<resetParams> | resetParams & Partial<mainParams>} param1
 */
export const handlePushAndResetBreadCrumbState = ({
  name,
  urlPath,
  to,
  id,
  reset,
  push,
  path,
  setPath,
}) => {
  if (reset) {
    if (!setPath) {
      setPath = useBreadcrumbStore.getState().setPath;
    }

    setPath(path);
    window.history.replaceState({ breadcrumbTrail: path }, "");
    return;
  }

  if (!push) {
    push = useBreadcrumbStore.getState().push;
  }

  const breadcrumb = { label: name, to, id };

  push(breadcrumb); // push to Zustand store

  // Replace the history state after navigation
  setTimeout(() => {
    // Push to browser history
    window.history.pushState(
      { breadcrumbPath: [...path, breadcrumb] },
      "",
      urlPath
    );
  }, 0);
};

/**
 *
 * @param {Omit<resetParams, 'reset'>} param0
 * @returns
 */
export const resetBreadCrumbState = ({ setPath, path }) => {
  if (!setPath) {
    setPath = useBreadcrumbStore.getState().setPath;
  }

  setPath(path);
  window.history.replaceState({ breadcrumbTrail: path }, "");
  return;
};

/**
 *
 * @param {{ getPath: boolean, url: string; }} param0
 */
export const getDataAndHandleBreadCrumb = async ({ getPath, url }) => {
  const pathParam = getPath ? `&path=1` : "";
  const res = await axiosRequest.get(`${url}${pathParam}`);

  if (getPath && res.data?.[0]) {
    const {
      stage,
      semester,
      level,
      parent: subLevelParent,
      subject,
    } = res.data[0];

    const path = [];
    if (stage?.title) {
      path.push({ label: stage.title, _id: stage._id, to: "/" });
    }

    if (level?.title) {
      path.push({
        label: level.title,
        _id: level._id,
        to: `/LevelsPage?stageId=${stage._id}`,
      });
    }

    if (subLevelParent?.title) {
      path.push({
        label: subLevelParent.title,
        _id: subLevelParent._id,
        to: `/subLevels?levelId=${level._id}`,
      });
    }

    if (subject?.title) {
      path.push({
        label: subject.title,
        _id: subject._id,
        to: `/Subjects?semesterId=${semester._id}`,
      });
    }

    resetBreadCrumbState({ path });
  }

  return res;
};
