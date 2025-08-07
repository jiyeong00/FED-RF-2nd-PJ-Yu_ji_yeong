package com.example.user.capstone_user;

import android.app.Activity;
import android.content.ContentValues;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class Receive_activity extends Activity {
    Button recBack;
    ListView listView;
    ArrayList<String> midList;
    ArrayAdapter<String> adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.receive_activity);
        recBack=(Button)findViewById(R.id.rec_back);

        midList=new ArrayList<String>();
        listView=(ListView)findViewById(R.id.list);

        adapter=new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,midList);
        listView.setAdapter(adapter);

//        String url = "http://192.168.0.12/User_receive.php";
        String url = "http://172.16.120.18/User_receive.php";

        // AsyncTask를 통해 HttpURLConnection 수행.
        Receive_activity.NetworkTask networkTask = new Receive_activity.NetworkTask(url, null);
        networkTask.execute();

        recBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });

        listView.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
            @Override
            public boolean onItemLongClick(AdapterView<?> adapterView, View view, int i, long l) {
                midList.remove(i);
                adapter.notifyDataSetChanged();
                return false;
                //삭제는 했는데 데베에서 삭제할 방법 찾아야함.
            }
        });

    }

    public class NetworkTask extends AsyncTask<Void, Void, String> {

        private String url;
        private ContentValues values;

        public NetworkTask(String url, ContentValues values) {

            this.url = url;
            this.values = values;
        }

        @Override
        protected String doInBackground(Void... params) {

            String result; // 요청 결과를 저장할 변수.
            RequestHttpURLConnection requestHttpURLConnection = new RequestHttpURLConnection();
            result = requestHttpURLConnection.request(url, values); // 해당 URL로 부터 결과물을 얻어온다.

            return result;
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            try{
                String result="";
                String state1 ="201837204";
                JSONObject order=new JSONObject(s);
                JSONArray index=order.getJSONArray("webnautes");
                for (int i=0;i<index.length();i++) {
                    JSONObject tt = index.getJSONObject(i);
                    if (tt.getString("notstdId").equals(state1)){
                        result += "날짜 : " + tt.getString("notDate") + "\n" +
                                "내용 : "+ tt.getString("notText") + "\n";
                        midList.add(result);
                        result="";
                    }
                    else
                        result += "오류 발생, 텍스트 내용이 나오지 않습니다";

                }
                adapter.notifyDataSetChanged();
            }catch (JSONException e){
                ;
            }
        }
        //doInBackground()로 부터 리턴된 값이 onPostExecute()의 매개변수로 넘어오므로 s를 출력한다.
    }
}
