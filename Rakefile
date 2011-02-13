require "date"

desc "Adds an upcoming event to the page"
task :add_event do
  date = if ENV["DATE"]
           ENV["DATE"]
         else
           now    = Time.now
           thurs2 = (8..14).map  { |d| Time.local(now.year, now.mon, d) }.
                            find { |d| d.wday == 4 }
           unless thurs2 >= now
             thurs2 = (8..14).map  { |d| Time.local( now.mon == 12 ?
                                                       now.year + 1 : now.year,
                                                     now.mon == 12 ?
                                                       1 : now.mon + 1,
                                                     d ) }.
                              find { |d| d.wday == 4 }
           end
           thurs2.strftime("%Y-%m-%d")
         end
  path = File.join( "events", "_posts",
                    "#{date}-#{ENV.fetch('EVENT', 'monthly-meeting')}.html" )
  if File.exist? path
    puts "The event already exists:  #{path}"
  else
    current  = File.basename(path)
    previous = Dir[File.join("events", "_posts", "*.html")].
               map  { |m|    File.basename(m) }.
               sort { |a, b| b <=> a          }.
               find { |m|    m < current      }
    open(path, "w") do |io|
      io.puts <<-END_EVENT_HTML.gsub(/^ {6}/, "")
      <ul class="content">
          <li>
              <span class="title">Content to be announced</span>
              <!-- by James Edward Gray II -->
          </li>
      </ul>
      END_EVENT_HTML
      if previous
        io.puts <<-END_EVENT_PAGINATOR_HTML.gsub(/^ {8}/, "")

        <div class="paginator">
            <a href="/events/#{previous.gsub(/(\d)-/, "\\1/")}">
                Show the #{Date::MONTHNAMES[previous[/\b\d{2}\b/].to_i]} Meeting
            </a>
        </div>
        END_EVENT_PAGINATOR_HTML
      end
      puts "You can now edit the event:  #{path}"
    end
  end
end

desc "Adds a member to the site's rotating directory"
task :add_member do
  if ENV["FULL_NAME"] =~ /\w/
    clean_name = ENV["FULL_NAME"].tr(" ", "-").delete("^-A-Za-z0-9_")
    path       = File.join( "members", "_posts",
                            "#{Time.now.strftime('%Y-%m-%d')}-" +
                            "#{clean_name}.html" )
    open(path, "w") do |io|
      io.puts <<-END_MEMBER_HTML.gsub(/^ {6}/, "")
      <img src="/images/members/#{clean_name}.jpg" width="100" height="100">
      <span class="name">#{ENV["FULL_NAME"]}</span>
      <span class="role">regular</span>
      <div class="description">
          Describe yourself here.
      </div>
      END_MEMBER_HTML
      puts "You can now edit your member profile:  #{path}"
    end
  else
    puts "USAGE:  rake add_member FULL_NAME='First Last'"
  end
end
