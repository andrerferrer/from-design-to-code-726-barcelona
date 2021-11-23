class MoviesController < ApplicationController
  def index
    @movies = Movie.order(year: :desc)

    if params[:query].present?
      @movies = @movies.where('title ILIKE ?', "%#{params[:query]}%")
    end

    # respond with a html file
    # render :index #.html.erb

    respond_to do |format|
      format.html # {}
      format.json {
        html = render_to_string(
          partial: 'movies/list',
          locals: { movies: @movies },
          formats: [ :html ]
        )
        render json: { html: html }
      }
    end
  end

  def update
    @movie = Movie.find(params[:id])
    @movie.update(strong_params)
    @movie.save

    respond_to do |format|
      format.html { redirect_to movies_path }
      format.text {
        render partial: 'movies/movie_infos',
               locals: { movie: @movie },
               formats: [ :html ]
      }
    end
  end

  private

  def strong_params
    params.require(:movie).permit(:title, :year)
  end
end
