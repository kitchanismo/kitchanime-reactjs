import React, { memo, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Loader from "../partials/loader";
import useAnime from "../../hooks/useAnime";
import withAuth from "../hoc/withAuth";
import Form from "../partials/form";

import { AnimeContext } from "./../../context";
import { formatDate, mapToSelect } from "../../services/utilsService";
import { toast } from "react-toastify";
import { getAnime, putAnime, postAnime } from "./../../services/animeService";
import BackButton from "./../partials/backButton";

const AnimeForm = ({ auth, ...props }) => {
  const context = useContext(AnimeContext);
  const id = props.match.params.id;

  const {
    state: { genres, studios, seasons, types }
  } = useAnime();

  const [anime, setAnime] = useState({
    id: 0,
    title: "",
    description: "",
    season: "",
    type: "",
    releaseDate: "",
    genres: [],
    studios: []
  });

  const [errors, setErrors] = useState({});

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedStudios, setSelectedStudios] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const schema = {
    id: Joi.number().integer(),
    title: Joi.string()
      .min(3)
      .required()
      .label("Title"),
    description: Joi.optional(),
    season: Joi.optional(),
    type: Joi.optional(),
    releaseDate: Joi.optional(),
    imageUrl: Joi.optional(),
    genres: Joi.array().optional(),
    studios: Joi.array().optional()
  };

  useEffect(() => {
    loadAnime();
  }, []);

  const loadAnime = async () => {
    try {
      if (id === "new") return;

      let { anime } = await getAnime(id);

      const {
        selectedGenres,
        selectedStudios,
        selectedSeason,
        selectedType
      } = mapToData(anime);

      anime.releaseDate = formatDate(anime.releaseDate);

      setAnime(anime);
      setSelectedGenres(selectedGenres);
      setSelectedStudios(selectedStudios);
      setSelectedSeason(selectedSeason);
      setSelectedType(selectedType);
    } catch (err) {
      if (err.response && err.response.status === 404)
        props.history.replace("/not-found");
    }
  };

  const mapToData = anime => {
    const selectedGenres = anime.genres.map(g => {
      return mapToSelect(g);
    });
    const selectedStudios = anime.studios.map(s => {
      return mapToSelect(s);
    });
    const selectedSeason = mapToSelect({ id: null, name: anime.season });
    const selectedType = mapToSelect({ id: null, name: anime.type });
    return { selectedGenres, selectedStudios, selectedSeason, selectedType };
  };

  const handleSubmit = async () => {
    if (!auth.isAdmin()) {
      toast.error("Unauthorized user");
      return;
    }

    const _anime = getMapSaveAnime(anime);

    const _animes = [...context.state.animes];

    try {
      //  console.log(context.state.animes);
      const { id } = _anime.id
        ? await putAnime(_anime.id, _anime)
        : await postAnime(_anime);

      // if (_anime.id) {
      //   context.onUpdate(_anime);
      // } else {
      //   _anime.id = id;
      //   context.onAdd(_anime);
      // }

      _anime.id ? toast.success("Updated") : toast.success("Added");
      // console.log(context.state.animes);
      context.onRefresh();
      props.history.replace("/");
    } catch (error) {
      //rollback on list if somethings go wrong
      // console.log(error);
      // context.onSetItems(_animes);
    }
  };

  // pending to tranform anime to  anime list format
  const getMapAnime = anime => {
    // const _anime = {...anime}
    // _anime.studios = studios.filter(s=>s.id === anime.studioIds)
  };

  const getMapSaveAnime = anime => {
    const _anime = { ...anime };
    _anime.genreIds = selectedGenres.map(g => g.id) || [];
    _anime.studioIds = selectedStudios.map(s => s.id) || [];
    _anime.season = selectedSeason ? selectedSeason.value : null;
    _anime.type = selectedType ? selectedType.value : null;
    if (_anime.releaseDate) {
      _anime.releaseDate = new Date(_anime.releaseDate).toISOString();
    } else {
      delete _anime.releaseDate;
    }
    return _anime;
  };

  const handleChangeGenres = selectedGenres =>
    setSelectedGenres(selectedGenres);

  const handleChangeSeason = selectedSeason =>
    setSelectedSeason(selectedSeason);

  const handleChangeType = selectedType => setSelectedType(selectedType);

  const handleChangeStudios = selectedStudios =>
    setSelectedStudios(selectedStudios);

  const handleDateChange = date => {
    const _anime = { ...anime };

    _anime.releaseDate = formatDate(date);

    setAnime(_anime);
  };

  const renderAdd = to => {
    return (
      <span className="">
        <Link to={to}>
          <button className="add-btn btn  btn-secondary btn-md ">...</button>
        </Link>
      </span>
    );
  };

  const labelButton = {
    name: id !== "new" ? "UPDATE" : "SAVE",
    loading: id !== "new" ? "UPDATING..." : "SAVING..."
  };

  return (
    <Loader isLoaded={studios.length > 0 || id === "new"}>
      <div className="col-8 offset-2">
        <h1>{id !== "new" ? "Edit Form" : "Add Form"}</h1>

        <span className=" d-flex justify-content-end">
          <BackButton {...props} />
        </span>
        <Form
          data={{ data: anime, setData: setAnime }}
          errors={{ errors, setErrors }}
          onSubmit={handleSubmit}
          schema={schema}
        >
          {({
            renderButton,
            renderInput,
            renderSelect,
            renderTextArea,
            renderDatePicker
          }) => {
            return (
              <React.Fragment>
                {renderInput("title", "Title")}

                {renderTextArea("description", "Description")}

                <div className="row">
                  <div className="col-6">
                    {renderSelect(
                      "season",
                      "Season",
                      selectedSeason,
                      handleChangeSeason,
                      seasons
                    )}
                  </div>
                  <div className="col-6">
                    {renderDatePicker("releaseDate", "Release", {
                      onChange: handleDateChange
                    })}
                  </div>
                </div>

                {renderSelect(
                  "type",
                  "Type",
                  selectedType,
                  handleChangeType,
                  types
                )}

                <div className="row">
                  <div className="col-11">
                    {renderSelect(
                      "genreIds",
                      "Genres",
                      selectedGenres,
                      handleChangeGenres,
                      genres,
                      { isMulti: true }
                    )}
                  </div>
                  <div className="col-1 mt-4">{renderAdd("/genres/new")}</div>
                </div>

                <div className="row">
                  <div className="col-11">
                    {renderSelect(
                      "studioIds",
                      "Studios",
                      selectedStudios,
                      handleChangeStudios,
                      studios,
                      { isMulti: true }
                    )}
                  </div>
                  <div className="col-1 mt-4">{renderAdd("/studios/new")}</div>
                </div>

                {renderInput("imageUrl", "Image Url")}

                {renderButton(
                  labelButton.name,
                  "fa fa-save",
                  labelButton.loading
                )}
              </React.Fragment>
            );
          }}
        </Form>
        <style jsx="">{`
          .add-btn {
            margin-top: 7px;
          }
        `}</style>
      </div>
    </Loader>
  );
};

export default memo(withAuth(AnimeForm));
