import { useEffect } from "react";
import { useBreadcrumbStore } from "../store/breadcrumbStore";
import axiosRequest from "../Api/axiosRequest";
import { useNavigate } from "react-router-dom";
/**
 *
 * @returns {{
 *    path: BreadcrumbItem[];
 *    push: () => void;
 *    setPath: resetParams['setPath'];
 *    clear: () => void;
 *    navigateAndPushState: (to: string, breadcrumb: BreadcrumbItem | BreadcrumbItem[]) => void
 *}}
 */
export const useBreadCrumbV2 = () => {
  const navigate = useNavigate();
  const { path, clear, setPath, push } = useBreadcrumbStore();

  /**
   *
   * @param {string} to
   * @param {BreadcrumbItem | BreadcrumbItem[]} breadcrumb
   */
  function navigateAndPushState(to, breadcrumb) {
    const base = import.meta.env.BASE_URL || "/";
    const fullPath = base.replace(/\/$/, "") + to;
    const newPath = [
      ...path,
      ...(Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb]),
    ];

    setPath(newPath);
    navigate(to);

    setTimeout(() => {
      window.history.replaceState({ breadcrumbPath: newPath }, "", fullPath);
    }, 0);
  }

  useEffect(() => {
    const state = window.history.state;

    // handle update store state
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

  return { path, push, setPath, clear, navigateAndPushState };
};

/**
 * @typedef {Object} BreadcrumbItem
 * @property {string} label
 * @property {string} [_id]
 * @property {string} [to]
 */

/**
 * @typedef {Object} resetParams
 * @property {boolean} reset
 * @property {(path: BreadcrumbItem[]) => void} [setPath]
 * @property {BreadcrumbItem[]} path
 */

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
  window.history.replaceState({ breadcrumbPath: path }, "");
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
