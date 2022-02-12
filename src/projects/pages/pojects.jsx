import React, { useState, useEffect, Fragment } from "react";
import Head from "../components/head";
import ProjectList from "../components/projectList";
import Pagination from "../../shared/components/pagination/pagination";
import { paginate } from "../../shared/utils/paginate";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/uiElements/LoadingSpinner";
import Footer from "../../shared/components/footer/footer";

const Projects = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(
          "https://mezriguiridha.herokuapp.com/api/projects/allProjects"
        );
        const data = responseData.reverse();
        setProjects(data);
      } catch (err) {}
    };
    fetchProjects();
  }, [sendRequest]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageData = () => {
    const allProjects = paginate(projects, currentPage, pageSize);
    return { totalCount: projects.length, data: allProjects };
  };

  const { totalCount, data } = getPageData();
  return (
    <div id="work">
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && data && (
        <Fragment>
          <Head />
          <div>
            <ProjectList data={data} />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Projects;
